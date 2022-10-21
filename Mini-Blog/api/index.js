require("dotenv").config();
const cors = require('cors')
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

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
