const Attendance = require("../Model/attandance_model");
const moment = require("moment");

const checkIn = async (req, res) => {
  const { userId } = req.body;

  try {
    const currentDate = moment().format("Do/MM/YYYY");
    let attendance = await Attendance.findOne({
      userId,
      "attendanceRecords.date": currentDate,
    });

    if (!attendance) {
      attendance = new Attendance({
        userId,
        attendanceRecords: [
          {
            date: currentDate,
            checkIn: [getCurrentTime()],
            checkOut: [],
            status: "Present",
          },
        ],
      });
    } else if (
      attendance.attendanceRecords[0].checkIn.length < 4 &&
      attendance.attendanceRecords[0].checkOut.length ===
        attendance.attendanceRecords[0].checkIn.length
    ) {
      attendance.attendanceRecords[0].checkIn.push(getCurrentTime());
      attendance.attendanceRecords[0].status = "Present";
    } else {
      return res.status(429).json({
        status: "error",
        message:
          "Maximum check-ins reached for the day or Check-out is pending",
      });
    }

    await attendance.save();
    return res
      .status(200)
      .json({ status: "success", message: "check-in successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const checkOut = async (req, res) => {
  const { userId } = req.body;
  try {
    const currentDate = moment().format("Do/MM/YYYY");
    let attendance = await Attendance.findOne({
      userId,
      "attendanceRecords.date": currentDate,
    });

    if (
      attendance &&
      attendance.attendanceRecords[0].checkIn.length >
        attendance.attendanceRecords[0].checkOut.length
    ) {
      attendance.attendanceRecords[0].checkOut.push(getCurrentTime());
      attendance.attendanceRecords[0].status = "Present";
      await attendance.save();
      return res
        .status(200)
        .json({ status: "success", message: "check-out successful" });
    } else {
      return res.status(400).json({
        status: "error",
        message: "No valid check-in found for the employee",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.params.id;

    const attendance = await Attendance.find({ userId });

    console.log("Retrieved All Attendance:", attendance);

    if (attendance && attendance.length > 0) {
      res.status(200).json({ message: "success", data: attendance });
    } else {
      res.status(400).json({ message: "no matching records found" });
    }
  } catch (error) {
    console.log("getAll ~ error:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const adminAttendance = async (req, res) => {
  try {
    const attendanceData = await Attendance.find().populate({
      path: "userId",
      select: "firstname lastname",
    });

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const del = async (req, res) => {
  try {
    const userId = req.params.id;
    const attendance = await Attendance.findByIdAndDelete(userId);

    if (!attendance) {
      res.status(400).json({ message: "Attendance Not Found" });
    }

    res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    console.log("del ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { checkIn, checkOut, getAll, adminAttendance, del };

function getCurrentTime() {
  return moment().format("LT");
}

module.exports = { checkIn, checkOut, getAll, adminAttendance, del };
