require("dotenv").config({ path: "./src/.env" });
const app = require("./src/app")
const DB = require("./src/config/db.config.js")
DB()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"hello from server",
        success:true
    })
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})