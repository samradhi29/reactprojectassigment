const router = require('express').Router();
const { json } = require('express');
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const { fullName, phoneNumber, email, password, companyName, isAgency } = req.body;

  try {
    
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      companyName,
      isAgency,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
     
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
  const token = jwt.sign({userId :user._id} , 'secret_key' , {expiresIn : '2h'});
  res.status(200).json({ token });
      console.log("User logged in successfully");


    
  
    } catch (err) {
      console.error("Error during login:", err.message);
      res.status(500).json({ message: `Error during login: ${err.message}` });
    }
  });
module.exports = router;
