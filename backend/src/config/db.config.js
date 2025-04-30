const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoose connected successfully")
    }catch(err){
        console.log("error in mongoose connection->",err)
    }
}

module.exports = connectDB