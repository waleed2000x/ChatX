import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// ? LOGIN
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: "Invalid username or password" });
    }
    const correctPassword = await user.correctPassword(password, user.password);
    if (!correctPassword) {
      return res.status(403).json({ message: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res
      .status(200)
      .json({ message: "Logged in successfully", username });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// ? SIGNUP
export const signup = async (req, res, next) => {
  const { _id, fullname, username, password, confirmPassword, gender } =
    req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(403).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

    const newUser = new User({
      id: _id,
      fullname,
      username,
      password,
      gender,
      profilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        message: `${fullname} Welcome, Signup successful`,
        id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
export const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error); // Log the error
    return res.status(500).json({ message: "Error logging you out", error });
  }
};
