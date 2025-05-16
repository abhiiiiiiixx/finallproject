const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    completedDays: [
      {
        date: {
          type: Date,
          required: true,
        },
        dayOfWeek: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
      },
    ],
    lastCompletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Method to mark a day as completed
TokenSchema.methods.markDayAsCompleted = async function (dayOfWeek) {
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Check if this day was already completed today
  const alreadyCompleted = this.completedDays.some((day) => {
    const dayDate = new Date(day.date).toISOString().split("T")[0];
    return dayDate === currentDate && day.dayOfWeek === dayOfWeek;
  });

  if (alreadyCompleted) {
    return false; // Already completed today
  }

  // Add the completed day
  this.completedDays.push({
    date: today,
    dayOfWeek,
  });

  // Update token count
  this.totalTokens += 1;

  // Update streak
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toISOString().split("T")[0];

  const completedYesterday = this.completedDays.some((day) => {
    const dayDate = new Date(day.date).toISOString().split("T")[0];
    return dayDate === yesterdayFormatted;
  });

  if (completedYesterday || !this.lastCompletedAt) {
    // If completed yesterday or this is the first completion, increase streak
    this.currentStreak += 1;
  } else {
    // Otherwise reset streak to 1
    this.currentStreak = 1;
  }

  this.lastCompletedAt = today;

  await this.save();
  return true;
};

module.exports = mongoose.model("Token", TokenSchema);
