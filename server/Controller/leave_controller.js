const Leave = require("../Model/leave_model");

const applyLeave = async (req, res) => {
  try {
    const {
      leavetype,
      leavestart,
      leaveend,
      leavetime,
      status,
      reason,
      leaveDate,
    } = req.body;
    const userId = req.userId;

    // Check if the leave type is paid-leave
    if (leavetype === "paid-leave") {
      // Check if the user has already applied for paid leave this month
      const currentMonthLeaves = await Leave.find({
        user: userId,
        leavetype: "paid-leave",
        leaveDate: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      });

      // If the user has already applied for paid leave this month, deny the request
      if (currentMonthLeaves.length > 0) {
        return res.status(400).json({
          message: "You can only apply for one paid leave per month.",
        });
      }

      // If the user hasn't applied for paid leave this month, check for the previous month
      const lastMonthLeaves = await Leave.find({
        user: userId,
        leavetype: "paid-leave",
        leaveDate: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          ),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      });

      // If the user has not applied for paid leave last month, they can apply for two paid leaves
      if (lastMonthLeaves.length === 0) {
        const leave = await Leave.create({
          leavetype,
          leavestart,
          leaveend,
          leavetime,
          leaveDate,
          status,
          reason,
          user: userId,
        });

        return res
          .status(200)
          .json({ message: "Leave applied successfully", leave });
      }
    } else {
      // If the leave type is not paid-leave or the user has already applied for paid leave, proceed as usual
      const leave = await Leave.create({
        leavetype,
        leavestart,
        leaveend,
        leavetime,
        leaveDate,
        status,
        reason,
        user: userId,
      });

      res.status(200).json({ message: "Leave applied successfully", leave });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying leave" });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Leave.find({ user: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const leaveUpdate = async (req, res) => {
  try {
    const {
      leavetype,
      startdata,
      leaveend,
      leavetime,
      status,
      reason,
      leaveDate,
    } = req.body;

    const user = await Leave.findByIdAndUpdate(
      req.params.id,
      { leavetype, startdata, leaveend, leavetime, status, reason, leaveDate },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Leave not found" });
    }

    // If admin rejected a paid-leave, update the status to 'pending'
    if (leavetype === "paid-leave" && status === "Rejected") {
      await Leave.findByIdAndUpdate(
        req.params.id,
        { status: "Pending" },
        { new: true }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const adminLeave = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("user", "firstname lastname");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findByIdAndDelete(req.params.id);
    if (!leaves) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Delete Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { applyLeave, getAll, leaveUpdate, adminLeave, deleteLeaves };
