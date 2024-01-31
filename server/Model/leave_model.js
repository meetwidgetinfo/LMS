const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  leavetype: {
    type: String,
    require: true,
  },
  leavestart: {
    type: Date,
    require: true,
  },
  leaveend: {
    type: Date,
    require: true,
  },
  leavetime: {
    type: String,
    require: true,
  },
  leaveDate: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  reason: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const leaveModel = new mongoose.model("Leave", leaveSchema);

module.exports = leaveModel;
