const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser")
require("dotenv").config();
const mongoose = require("mongoose");
const axios=require("axios")
const bodyParser = require('body-parser');
const path=require("path")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
 { useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));


const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true,limit:"50mb" }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-crud-auth-hzrx.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  
  credentials: true, // Enable cookies and authentication headers
}));

app.get("/api/test", async (req, res) => {
  res.json({ message: "hello" });
});


app.use(express.static(path.join(__dirname, "../client/dist")));
app.use('/uploads', express.static('uploads'));

app.use("/api/auth",require("./app/routes/userAuth.routes"))
app.use("/api/products",require("./app/routes/products.routes"))

const PORT=process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:4000`);
});
