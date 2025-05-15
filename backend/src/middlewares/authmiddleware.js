const jwt = require("jsonwebtoken");
const User = require("../models/userModels/user.model.js");



const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) return next(new CustomError("Unauthorized user!", 401));

   
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);

    if (!user) return res.status(401).json({message:"unauthorized user"})

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message:"unauthorized user"})
  }
};

module.exports = authMiddleware;