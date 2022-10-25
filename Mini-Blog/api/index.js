require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const app = express();
const connectDB = require("./db/connect");

const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const profileRoute = require("./routes/profile");

cloudinary.config({
  cloud_name: "dwrkyk0oz",
  api_key: 149947671157136,
  api_secret: "QVjsG-IL6uh9QLtV3Zj4U6VwcYw",
});

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.json({ msg: "api is working fine" });
});
// app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/profile", profileRoute);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
