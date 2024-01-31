const User = require("../Model/user_model");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, address, phone, role } =
      req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(200).json({ message: "email already exist" });
    }

    const newUSer = await User.create({
      firstname,
      lastname,
      email,
      password,
      address,
      phone,
      role,
    });

    res.status(200).json({
      message: "registration successful",
      token: await newUSer.generateToken(),
      userId: newUSer._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(402).json({ message: "Invalid email or password" });
    }

    const compare = await userExist.comparePassword(password);
    if (!compare) {
      return res.status(402).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      user: userExist,
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const user = async (req, res) => {
  try {
    const user = req.user;
    console.log("🚀 ~ user ~ user:", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      res.status(400).json({ status: "error", message: "not found" });
    }

    res
      .status(200)
      .json({ message: "successfully updated", data: updatedUser });
  } catch (error) {
    console.log("update ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, user, update };
