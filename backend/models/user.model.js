import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  actualPassword
) {
  return await bcrypt.compare(candidatePassword, actualPassword);
};

const User = mongoose.model("User", UserSchema);

export default User;
