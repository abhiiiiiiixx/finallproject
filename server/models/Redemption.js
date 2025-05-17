const mongoose = require("mongoose");

const RedemptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["donate", "consult"],
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    details: {
      // For consult type
      name: String,
      date: Date,
      time: String,
      goals: String,
      status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
      },
      // Any additional details
      additionalInfo: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Redemption", RedemptionSchema);
