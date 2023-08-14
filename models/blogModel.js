import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Is Mandatory"],
    },
    description: {
      type: String,
      required: [true, "Description Is Mandatory"],
    },
    image: {
      type: String,
      required: [true, "Images Is Mandatory"],
    },
    location: {
      type: String,
      required: [true, "Images Is Mandatory"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id Is Mandatory"],
    },
  },

  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
