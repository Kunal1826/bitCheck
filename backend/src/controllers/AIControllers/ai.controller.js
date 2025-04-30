const aiService = require("../../services/ai.service")
const codereviewer = aiService.generateCodeReview
const codereimprover = aiService.generateCodeImprove
const codeTestCases = aiService.generateTestCases



const reviewController = async (req, res,next) =>{
     try{
        const {code} = req.body

        if(!code){
            res.status(400).json({message:"prompt is required"})
        }

       const result = await codereviewer(code)
       res.status(200).json({message:"response generated successfully", data:result})

     }catch(err){
        console.log(err)
        res.status(500).json({message:"error in review generation"})
     }
} 

const improveController = async (req, res,next) =>{
    try{
       const {code} = req.body

       if(!code){
           res.status(400).json({message:"prompt is required"})
       }

      const result = await codereimprover(code)
      res.status(200).json({message:"response generated successfully", data:result})

    }catch(err){
       console.log(err)
       res.status(500).json({message:"error in review generation"})
    }
} 


const testcaseController = async (req, res,next) =>{
    try{
       const {code} = req.body

       if(!code){
           res.status(400).json({message:"prompt is required"})
       }

      const result = await codeTestCases(code)
      res.status(200).json({message:"response generated successfully", data:result})

    }catch(err){
       console.log(err)
       res.status(500).json({message:"error in review generation"})
    }
} 


module.exports = {
    reviewController,
    improveController,
    testcaseController
}