const express = require("express")
const router = express.Router();
const AIControllers = require("../../controllers/AIControllers/ai.controller.js")

router.post("/get-review",AIControllers.reviewController)
router.post("/get-improve",AIControllers.improveController)
router.post("/get-testcases",AIControllers.testcaseController)

module.exports = router;