const express = require("express");
const router = express.Router();
const Redemption = require("../models/Redemption");
const Token = require("../models/Token");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");

// Constants for token costs
const DONATE_COST = 10;
const CONSULT_COST = 30;

// Setup email transporter (in production, use proper credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "noreply@yourdomain.com",
    pass: process.env.EMAIL_PASS || "yourpassword",
  },
});

// @route   GET /api/redemptions
// @desc    Get user's redemption history
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const redemptions = await Redemption.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(redemptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/redemptions/donate
// @desc    Redeem tokens for food donation
// @access  Private
router.post("/donate", auth, async (req, res) => {
  try {
    // Get user's tokens
    let userTokens = await Token.findOne({ userId: req.user.id });

    if (!userTokens || userTokens.totalTokens < DONATE_COST) {
      return res.status(400).json({ msg: "Not enough tokens" });
    }

    // Deduct tokens
    userTokens.totalTokens -= DONATE_COST;
    await userTokens.save();

    // Create redemption record
    const redemption = new Redemption({
      userId: req.user.id,
      type: "donate",
      cost: DONATE_COST,
    });

    await redemption.save();

    res.json({
      success: true,
      totalTokens: userTokens.totalTokens,
      redemption,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/redemptions/consult
// @desc    Redeem tokens for dietitian consultation
// @access  Private
router.post("/consult", auth, async (req, res) => {
  const { name, date, time, goals } = req.body;

  // Validate input
  if (!name || !date || !time || !goals) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    // Get user's tokens
    let userTokens = await Token.findOne({ userId: req.user.id });

    if (!userTokens || userTokens.totalTokens < CONSULT_COST) {
      return res.status(400).json({ msg: "Not enough tokens" });
    }

    // Deduct tokens
    userTokens.totalTokens -= CONSULT_COST;
    await userTokens.save();

    // Create redemption record
    const redemption = new Redemption({
      userId: req.user.id,
      type: "consult",
      cost: CONSULT_COST,
      details: {
        name,
        date: new Date(date),
        time,
        goals,
        status: "pending",
      },
    });

    await redemption.save();

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || "noreply@yourdomain.com",
        to: req.user.email, // Assuming the user object has email
        subject: "Dietitian Consultation Booking Confirmation",
        html: `
          <h1>Booking Confirmation</h1>
          <p>Dear ${name},</p>
          <p>Your consultation with a dietitian has been booked successfully.</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Your Goals:</strong> ${goals}</p>
          <p>Our dietitian will contact you shortly to confirm the appointment.</p>
          <p>Thank you for using our service!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Continue with the response even if email fails
    }

    res.json({
      success: true,
      totalTokens: userTokens.totalTokens,
      redemption,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
