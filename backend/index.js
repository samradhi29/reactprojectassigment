const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Authroute = require('./routes/Authroute');

const profileroute = require('./routes/profileroute')
const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));
app.use((cors()));
app.use(express.json());

mongoose.connect('mongodb+srv://samradhi4320:samradhi29@cluster0.adbkc.mongodb.net/')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/' , Authroute);
app.use('/profile' ,  profileroute)
const port = 5000;
app.listen(port , (req , res)=>{
    console.log("server is running");
})