const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Attendance = require("./models/attendance");

// Routes
const attendanceRoutes = require("./routes/attendance");
app.use("/attendance", attendanceRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: String,
  attendanceRecords: [
    {
      date: String,
      checkIn: [String],
      checkOut: [String],
      status: String,
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getAll,
} = require("../controllers/attendanceController");

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/getAll/:userId", getAll);

module.exports = router;

const Attendance = require("../models/attendance");

const checkIn = async (req, res) => {
  // Implementation for check-in
};

const checkOut = async (req, res) => {
  // Implementation for check-out
};

const getAll = async (req, res) => {
  // Implementation to fetch all records
};

module.exports = { checkIn, checkOut, getAll };

const Attendance = require("../models/attendance");
const moment = require("moment");

const checkIn = async (req, res) => {
  const { userId } = req.body;

  try {
    const currentDate = moment().format("DD-MM-YYYY");
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
      // Proceed with check-in
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
      .json({ status: "success", message: "Check-in successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkOut = async (req, res) => {
  // Similar logic as check-in
};

const getAll = async (req, res) => {
  // Implementation to fetch all records
};

function getCurrentTime() {
  return moment().format();
}

module.exports = { checkIn, checkOut, getAll };

// ... Your existing React code ...

const fetchUpdatedData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/attendance/getAll/${user._id}`
    );

    setAttendanceData(response?.data?.data?.attendanceRecords);
  } catch (err) {
    console.log(err?.message);
  }
};

// ... Your existing React code ...

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../Redux/Features/AuthSlice/AuthSlice";
import axios from "axios";
import { Button, Container, Input } from "reactstrap";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import moment from "moment/moment";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    // Fetch user data first
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Fetch attendance data only when user data is available
    if (user?._id) {
      fetchUpdatedData();
    }
  }, [user, dispatch]);

  const checkInHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/checkin",
        {
          userId: user?._id,
        }
      );

      console.log(response.data);
      toast({
        title: "Successful",
        description: "Check In Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Fetch updated data after check-in
      fetchUpdatedData();
    } catch (err) {
      console.log(err?.message);
      toast({
        title: "Failed",
        description: "Check-Out First",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const checkOutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/checkout",
        {
          userId: user?._id,
        }
      );

      console.log(response.data);
      toast({
        title: "Success",
        description: "Check-Out Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Fetch updated data after check-out
      fetchUpdatedData();
    } catch (err) {
      console.log(err?.message);
      toast({
        title: "Check-Out Failed",
        description: "Check-In First",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/attendance/getAll/${user._id}`
      );

      setAttendanceData(response?.data?.data?.attendanceRecords);
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div className="py-20 h-full">
      <Container>
        <div className="flex justify-between">
          <div>
            <Input />
          </div>
          <div className="flex gap-3 pb-6">
            <Button color="success" onClick={() => checkInHandler()}>
              Check-In
            </Button>
            <Button color="danger" onClick={() => checkOutHandler()}>
              Check-Out
            </Button>
          </div>
        </div>
        <TableContainer>
          <Table variant="simple" size={"lg"}>
            <Thead>
              <Tr>
                <Th>Sr</Th>
                <Th>Date</Th>
                <Th>Check-In</Th>
                <Th>Check-Out</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attendanceData?.map((e, i) => {
                return (
                  <Tr key={e?._id}>
                    <Tr className="grid place-content-center h-max">{i + 1}</Tr>
                    <Td>{e?.date}</Td>
                    <Td>
                      {e?.checkIn?.map((checkInTime, index) => (
                        <Tr key={index}>
                          <Td>{checkInTime}</Td>
                        </Tr>
                      ))}
                    </Td>
                    <Td>
                      {e?.checkOut?.map((checkOutTime, index) => (
                        <Tr key={index}>
                          <Td>{checkOutTime}</Td>
                        </Tr>
                      ))}
                    </Td>
                    <Td>{e?.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Attendance;
