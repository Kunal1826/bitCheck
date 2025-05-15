
const codesModel = require("../../models/codeSubmissionModels/codeSubmission.model");
const userModel = require("../../models/userModels/user.model");

const getCodes = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    console.log("Authenticated user:", req.user);

    if (!loggedInUserId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const userCodes = await codesModel.find({ userId: loggedInUserId });

    if (!userCodes || userCodes.length === 0) {
      return res.status(404).json({ message: "No codes found for this user" });
    }

    res.status(200).json({
      success: true,
      message: "Codes retrieved successfully",
      codes: userCodes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving codes",
      error: error.message,
    });
  }
};

const getAllCodes = async(req, res) =>{
    try{
        const codes = await codesModel.find().populate("userId", "name email");


        if(!codes || codes.length ===0){
            return res.status(404).json({message:"no codes found"})
        }
        res.status(200).json({success:true, message:"codes retrieved successfully", codes})
    }catch(error){
        res.status(500).json({message:"error retrieving codes", error: error.message})
    }
}

const getCodeById = async (req, res) => {
  const { id } = req.params;
  const code = await codesModel.findById(id);

  if (!code) return res.status(404).json({ message: "Code not found" });

  res.json({
    codeName: code.codeName,
    status: code.status,
    fileUrl: code.fileUrl, 
  });
};

const getCodeDetailsById = async (req, res) => {
  try {
    const { codeId } = req.params;
    const code = await codesModel.findById(codeId).populate("userId");

    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    }

    const username = await userModel.findById(code.userId);

    if(!username) {
      return res.status(404).json({message:"user not found for this code"})
    }

    res.status(200).json({
      success: true,
      userName: username.username || "unknown",
      createdAt: code.uploadedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving code", error: error.message });
  }
};

const reviewCode  = async (req,res) =>{
  const { status, comment } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid review status." });
  }

  if (!comment || typeof comment !== "string") {
    return res.status(400).json({ message: "Comment is required." });
  }

  try {
    const code = await codesModel.findById(req.params.id);

    if (!code) {
      return res.status(404).json({ message: "Code submission not found." });
    }


    code.status = status;

    code.comments.push({
      userId: req.user._id,
      role: req.user.role,
      text: comment,
    });

    await code.save();

    res.status(200).json({ message: `Code ${status} successfully.`, code });
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
}



module.exports = {
    getCodes,
    getCodeById,
    getAllCodes,
    getCodeDetailsById,
    reviewCode
}