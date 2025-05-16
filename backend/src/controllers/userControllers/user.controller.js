const userModel = require("../../models/userModels/user.model.js")
const bcrypt = require("bcrypt")


const registerController = async (req, res, next) => {
    const { username, email, password ,role} = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) return res.status(400).json({message:"user already exists"});

      const user = await userModel.create({
        username,
        email,
        password,
        role,
      });
  
      const token = await user.generateAuthToken();
     
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
         secure: true,

      });
  
      res.status(201).json({success:true, message: "User created successfully", token: token, user:user });
    } catch (error) {
        res.status(500).json({message:"error in user creation->",error: error.message})
    }
  };

  const loginController = async (req, res, next) => {
    const { email, password, role } = req.body;
  
    try {
      const user = await userModel.authenticateUser(email, password);

       const userRole = user.role;

      if(userRole != role) return res.status(400).json({message: "Access denied"})

      const token = await user.generateAuthToken();
    
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
         secure: true,

      });
  
      res.status(200).json({success:true, message: "User Logged in", token: token, user:user });
    } catch (error) {
      res.status(500).json({ message: "Error in user login", error: error.message });
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