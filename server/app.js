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
app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
    credentials:true
  }
));

app.get("/api/test", async (req, res) => {
  res.json({ message: "hello" });
});


app.use(express.static(path.join(__dirname, "../client/dist")));
app.use('/uploads', express.static('uploads'));

app.use("/api/auth",require("./app/routes/userAuth.routes"))
app.use("/api/products",require("./app/routes/products.routes"))

app.listen(4000, () => {
  console.log(`server is running on http://localhost:4000`);
});
