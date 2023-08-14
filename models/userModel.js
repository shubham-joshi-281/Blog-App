import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Mandatory"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Is Mandatory"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Is Mandatory"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
