const express = require('express')
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/post')

app.use(express.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(console.log("connected to mongo"))
.catch((err) => console.log(err))


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)


app.use("/", (req, res)=>{
    console.log("main url")
})



const PORT = 5000
app.listen(PORT, ()=>{
    console.log("Backend is running")
})