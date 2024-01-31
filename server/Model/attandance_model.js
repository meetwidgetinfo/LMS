const mongoose = require("mongoose");

const attandanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  attendanceRecords: [
    {
      date: {
        type: String,
        require: true,
      },
      checkIn: [
        {
          type: String,
          require: true,
        },
      ],
      checkOut: [
        {
          type: String,
          require: true,
        },
      ],
      status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Absent",
      },
    },
  ],
});

const attendanceceModel = new mongoose.model("Attendance", attandanceSchema);

module.exports = attendanceceModel;
