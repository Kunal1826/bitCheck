const userModel = require("../../models/userModels/user.model.js")
const bcrypt = require("bcrypt")


const registerController = async (req, res, next) => {
    const { username, email, password} = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) return res.status(400).json({message:"user already exists"});
  
      const user = await userModel.create({
        username,
        email,
        password,
      });
  
      const token = await user.generateAuthToken();
     
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
      });
  
      res.status(201).json({ message: "User created successfully", token: token });
    } catch (error) {
        res.status(500).json({message:"error in user creation->",error: error.message})
    }
  };

  const loginController = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.authenticateUser(email, password);
  
      const token = await user.generateAuthToken();
    
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
      });
  
      res.status(200).json({ message: "User Logged in", token: token });
    } catch (error) {
       res.status(500).json({message:"error in user login"})
    }
  };

  const logoutController = async (req, res, next) => {
    const { token } = req.cookies;
    try {
      if (!token) return res.status(400).json({ message:"user not logged in"});
  
      res.clearCookie("token");
      res.status(200).json({ message: "user logged out" });
    } catch (error) {
      res.status(500).json({message:"error in user logout"})
    }
  };

  module.exports = {
    registerController,
    loginController,
    logoutController
  }