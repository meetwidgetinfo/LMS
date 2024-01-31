const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  usertype: {
    type: String,
    default: "employee",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const genSlat = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(this.password, genSlat);
    this.password = hash_Password;
  } catch (error) {
    console.error(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        email: this.email,
        userType: this.usertype,
        userId: this._id.toString(),
        usertype: this.usertype,
      },
      process.env.SECRET_KRY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {}
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = new mongoose.model("Employee", userSchema);

module.exports = userModel;
