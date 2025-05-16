const express = require("express");
const router = express.Router();
const Token = require("../models/Token");
const auth = require("../middleware/auth");

// @route   GET /api/tokens
// @desc    Get user's tokens and streak
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let userTokens = await Token.findOne({ userId: req.user.id });

    if (!userTokens) {
      // If no token record exists, create one
      userTokens = new Token({
        userId: req.user.id,
        totalTokens: 0,
        currentStreak: 0,
        completedDays: [],
      });
      await userTokens.save();
    }

    res.json({
      totalTokens: userTokens.totalTokens,
      currentStreak: userTokens.currentStreak,
      completedDays: userTokens.completedDays,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/tokens/complete-day
// @desc    Mark a day as completed and award a token
// @access  Private
router.post("/complete-day", auth, async (req, res) => {
  const { dayOfWeek } = req.body;

  // Validate day of week
  const validDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (!validDays.includes(dayOfWeek)) {
    return res.status(400).json({ msg: "Invalid day of week" });
  }

  try {
    let userTokens = await Token.findOne({ userId: req.user.id });

    if (!userTokens) {
      // If no token record exists, create one
      userTokens = new Token({
        userId: req.user.id,
        totalTokens: 0,
        currentStreak: 0,
        completedDays: [],
      });
    }

    // Mark day as completed
    const success = await userTokens.markDayAsCompleted(dayOfWeek);

    if (!success) {
      return res.status(400).json({ msg: "Day already completed" });
    }

    res.json({
      totalTokens: userTokens.totalTokens,
      currentStreak: userTokens.currentStreak,
      completedDays: userTokens.completedDays,
      msg: "Day marked as completed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
