const jwt = require("jsonwebtoken");
const User = require("../Model/user_model");

const userMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const jwToken = token.substring(7).trim();

  try {
    const isVerified = jwt.verify(jwToken, process.env.SECRET_KRY);

    const userVerified = await User.findOne({ email: isVerified.email }).select(
      { password: 0 }
    );

    if (!userVerified) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userVerified;
    req.token = token;
    req.userId = userVerified._id;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userMiddleware;
