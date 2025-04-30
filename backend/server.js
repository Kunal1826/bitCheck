require("dotenv").config({ path: "./src/.env" });
const app = require("./src/app")
const DB = require("./src/config/db.config.js")
DB()


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})