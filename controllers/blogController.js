import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

// BLOG GET ALL CONTROLLERS
const blogGetAllController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).json({
        success: false,
        message: "No Blogs Found",
        error,
      });
    }
    return res.status(200).json({
      blogCount: blogs.length,
      success: true,
      message: "All Blogs Fetched",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong In Getting All Blogs",
      error,
    });
  }
};

// BLOG CREATE CONTROLLERS
const blogCreateController = async (req, res) => {
  try {
    const { title, description, image, location, user } = req.body;
    // Validation of all fields
    if (!title) {
      return res.status(401).json({
        success: false,
        message: "Title Field Is Reqiured",
      });
    }
    if (!description) {
      return res.status(401).json({
        success: false,
        message: "Description Field Is Reqiured",
      });
    }
    if (!image) {
      return res.status(401).json({
        success: false,
        message: "Image Field Is Reqiured",
      });
    }
    if (!location) {
      return res.status(401).json({
        success: false,
        message: "Location Field Is Reqiured",
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Id Is Reqiured",
      });
    }
    // existing user
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Unable To Find  User",
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      image,
      location,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong In Creating Blogs",
      error,
    });
  }
};

// BLOG GET CONTROLLERS
const blogGetController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No Blogs Founds With This Id",
        error,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Getting Single Blog Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong In Getting single Blogs",
      error,
    });
  }
};

// BLOG UPDATE CONTROLLERS
const blogUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, location } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " Went Wrong In Updating Blog",
      error,
    });
  }
};

// BLOG DELETE CONTROLLERS
const blogDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({
      success: true,
      message: "Deleted Blog Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong In Deleting Blogs",
      error,
    });
  }
};

// USER BLOG CONTROLLER
const userBlogController = async (req, res) => {
  try {
    const userId = req.params.id;
    const userBlog = await userModel.findById(userId).populate("blogs");
    if (!userBlog) {
      return res.status(401).json({
        success: false,
        message: "No Blog Found With This Id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Blog Fetched Successfully",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong In User Blogs",
      error,
    });
  }
};

export {
  blogCreateController,
  blogUpdateController,
  blogDeleteController,
  blogGetAllController,
  blogGetController,
  userBlogController,
};
