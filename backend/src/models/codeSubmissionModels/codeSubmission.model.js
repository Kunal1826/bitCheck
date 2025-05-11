const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["developer", "reviewer", "admin"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const codeSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  fileUrl: {
    type: String,
    required: true,
  },
  originalFilename: {
    type: String,
    required: true,
  },
  codeName:{
    type:String,
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "approved", "rejected","submitted"],
    default: "pending",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema], 
},
{
  timestamps: true,
});

module.exports = mongoose.model("CodeSubmission", codeSubmissionSchema);
