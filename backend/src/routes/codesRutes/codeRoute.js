// routes/codeRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Readable } = require("stream");
const CodeSubmission = require("../../models/codeSubmissionModels/codeSubmission.model");
const cloudinary = require("../../services/cloudService");
const authMiddleware = require("../../middlewares/authmiddleware");
const codesController = require("../../controllers/codesControllers/codeController")

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to upload file buffer to Cloudinary
const streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // to support any file type
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    Readable.from(file.buffer).pipe(stream);
  });
};

router.post("/upload-code", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const {comment,codeName } = req.body;
    const role = req.user.role
    const userId = req.user._id


    const result = await streamUpload(req.file);
    const fileUrl = result.secure_url;

   
    const submission = new CodeSubmission({
      userId,
      role,
      fileUrl,
      originalFilename: req.file.originalname,
      codeName:codeName,
      status: "pending",
      comments: comment
        ? [
            {
              userId,
              role,
              text: comment,
            },
          ]
        : [],
    });

    await submission.save();

   
    res.status(201).json({
      success: true,
      message: "Code uploaded successfully",
      submission,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

router.get("/get-codes", authMiddleware, codesController.getCodes)

router.get("/get-code/:id", authMiddleware, codesController.getCodeById)

router.put("/update-code/:id",authMiddleware,upload.single("file"), async (req, res) => {
    try {
      const { id } = req.params;
      const { codeName, comment } = req.body;
      const userId = req.user._id;
      const role = req.user.role;

      // Find existing submission
      const existing = await CodeSubmission.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: "Code not found" });
      }

      // Try to delete previous file from Cloudinary
      const urlParts = existing.fileUrl.split("/");
      const publicId = urlParts[urlParts.length - 1].split(".")[0]; // crude extract
      await cloudinary.uploader.destroy(`codes/${publicId}`, {
        resource_type: "raw",
      });

      // Upload new file
      const result = await streamUpload(req.file);

      // Update fields
      existing.fileUrl = result.secure_url;
      existing.originalFilename = req.file.originalname;
      existing.codeName = codeName || existing.codeName;
      existing.status = "pending";

      // Add optional comment
      if (comment) {
        existing.comments.push({
          userId,
          role,
          text: comment,
        });
      }

      await existing.save();

      res.status(200).json({
        success: true,
        message: "Code updated successfully",
        updatedCode: existing,
      });
    } catch (error) {
      console.error("Update failed:", error);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);

router.get("/get-all-codes",authMiddleware, codesController.getAllCodes)


router.get("/get-code-details/:codeId", codesController.getCodeDetailsById);

router.put("/review-code/:id", authMiddleware, codesController.reviewCode)


module.exports = router;
