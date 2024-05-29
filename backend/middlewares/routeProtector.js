import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const routeProtector = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated - token not there" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Not authenticated - incorrect jwt" });
    }
    let user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authenticated - user does not exist" });
    }
    req.user = user; // Assign user object to req.user
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authenticated" });
  }
};

export default routeProtector;
