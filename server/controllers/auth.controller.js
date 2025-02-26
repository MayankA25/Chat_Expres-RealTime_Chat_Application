import { validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { comparePassword, hashPassword } from "../utils/password.js";
import cloudinary from "../utils/cloudinary.js";

dotenv.config({
  path: "D:\\Mayank Data\\CODING\\MERN Projects\\Chat Express\\server\\.env",
});

export const signup = async (req, res) => {
  let { fullName, email, password } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) return res.status(400).json({ result });

  const foundUser = await User.findOne({ email });

  if (foundUser) return res.status(400).json({ msg: "User Already Exists" });

  password = await hashPassword(password);

  const newUser = new User({
    fullName,
    email,
    password,
  });

  const savedUser = await newUser.save();

  const userId = savedUser._id;

  const payload = {
    userId,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  req.session.refreshToken = refreshToken;
  req.session.userId = savedUser._id;

  // console.log(savedUser);

  return res.status(200).json({ accessToken, savedUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;


  const result  = validationResult(req);

  if(!result.isEmpty()) return res.status(400).json({ result })


  if (req.session.refreshToken && req.session.userId) {
    const payload = {
      userId: req.session.userId,
    };

    // const foundUser = await User.findById(userId);

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    return res.status(200).json({ accessToken });
  }

  try {
    var foundUser = await User.findOne({ email });
  } catch (e) {
    return res.status(400).json({ msg: "Internal Server Error" });
  }

  if (!foundUser) return res.status(401).json({ msg: "Invalid Credentials" });

  if (!comparePassword(password, foundUser.password))
    return res.status(401).json({ msg: "Invalid Credentials" });

  const payload = {
    userId: foundUser._id,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  req.session.refreshToken = refreshToken;
  req.session.userId = foundUser._id;

  // console.log(foundUser);

  return res.status(200).json({ accessToken, foundUser });
};

export const check = async (req, res) => {
  // console.log("Checking....")
  // console.log(req.session)
  return res.status(200).json({ loggedInUser: req.session.user })
};


export const logout = async(req, res)=>{
  req.session.destroy((err)=>{
    if(err) return res.status(500).json({ msg : "Internal Server Error" })
    
    return res.status(200).json({ msg: "Logged Out Successfully" })
  })
}


export const updateProfile = async(req, res)=>{
  const { profilePic } = req.body;

  if(!profilePic) return res.status(400).json({ msg: "Profile Picture Is Required" });

  const response = await cloudinary.uploader.upload(profilePic, { public_id:"Profile" }).catch((err)=>{
    console.log(err)
  });

  const userId = req.session.userId;

  if(!userId) return res.status(401).json({ msg: "Unauthorized" });

  const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: response.secure_url }, { new: true });

  return res.status(200).json({ updatedUser });

}