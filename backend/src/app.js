const express = require('express');
app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors")

const AIRoutes = require("./routes/AIRoutes/ai.route.js")
const userRoutes = require("./routes/userRoutes/user.route.js")

app.use(cors())
app.use(cookieparser())


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/ai",AIRoutes)
app.use("/api/user",userRoutes)

module.exports = app;