import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//Register user
export const registerUser = async (req, res) => {
  console.log('///');
  
  const {firstname, lastname, email, password, confirmPassword} = req.body;
  console.log(req.body);
  
  try {
    if(password !== confirmPassword) {
      return res.status(400).json({message: 'Passwords do not match'});
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message:'User already exists'});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User ({
      firstname,
      lastname,
      email,
      password:hashedPassword
    });

    await newUser.save();
    console.log("User registered Successfully")
    res.status(201).json({message:'User registered successfully',newUser})
  } catch (error) {
    res.status(400).json({message:"Error registering user",error:error.message})
  }
}

//Login User
export const loginUser = async(req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({message:'Invalid Credentials'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({message:'Invalid Credentials'});
    }
    const token = generateToken(user._id);

    res.status(200).json({message:'User Logged in Successfully', token})
  } catch (error) {
    res.status(500).json({message:'Error logging in:', error:error.message});
  }
};

