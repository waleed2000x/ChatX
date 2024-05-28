import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15h",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // prevention from XSS attack
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000, // in hours it is equal to 24 hours
  });
  return token;
};

export default generateTokenAndSetCookie;
