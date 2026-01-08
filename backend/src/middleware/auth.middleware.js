import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach user to request
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  // 5. No token
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

export default protect;
