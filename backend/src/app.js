const express = require('express');
app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors")

const AIRoutes = require("./routes/AIRoutes/ai.route.js")
const userRoutes = require("./routes/userRoutes/user.route.js")
const uploadCodeRoute = require("./routes/codesRutes/codeRoute.js")


const allowedOrigins = [
  "http://localhost:5173", 
  "https://bitcheck-frontend.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
}));

app.use(cookieparser())


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/ai",AIRoutes)
app.use("/api/user",userRoutes)
app.use("/api/code",uploadCodeRoute)

module.exports = app;