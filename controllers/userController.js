import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../middleware/auth.js";
import JWT from "jsonwebtoken";

class userController {
  // Register Controller
  static registerController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Validation for all Fields
      if (!name) {
        return res.status(401).send({
          message: "User Name Is Mandatory",
          success: false,
        });
      }
      if (!email) {
        return res.status(401).send({
          message: "User Email Is Mandatory",
          success: false,
        });
      }
      if (!password) {
        return res.status(401).send({
          message: "User Password Is Mandatory",
          success: false,
        });
      }
      // Existing User
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res.status(404).send({
          message: "User Already registered",
          success: false,
        });
      }

      // Hashed Password
      const hashedPassword = await hashPassword(password);

      // Save New User
      const user = new userModel({ name, email, password: hashedPassword });
      await user.save();
      return res.status(200).send({
        message: "User Registered Successfully",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error In Register Controller",
        error,
      });
    }
  };

  // Login Controller
  static loginController = async (req, res) => {
    try {
      const { email, password } = req.body;

      // validation of all fields
      if (!email) {
        return res.status(404).send({
          message: "Email Is Mandatory",
          success: false,
        });
      }
      if (!password) {
        return res.status(404).send({
          message: "Password Is Mandatory",
          success: false,
        });
      }

      // user already login
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          message: "User Is Already Login",
          success: false,
        });
      }

      // Compare Password
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(404).send({
          message: "Password Is Invalid",
          success: false,
        });
      }

      // JWT TOKEN
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({
        message: "User Loged In Successfully",
        success: true,
        user,
        token,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error on Login Controller",
        error,
      });
    }
  };

  // Get All User Controller
  static getAllUserController = async (req, res) => {
    try {
      const user = await userModel.find({});
      return res.status(200).send({
        userCount: user.length,
        success: true,
        message: "getting All User",
        user,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Something Went Wrong Get All Controller",
        error,
      });
    }
  };
}

export default userController;
