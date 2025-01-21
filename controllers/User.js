import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

// Signup
export async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user.", error });
  }
}


// Login
export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in.", error });
  }
}

// List users
export async function userList(req, res) {
  try {
    const users = await UserModel.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users.", error });
  }
}

// Update user
export async function userUpdate(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true } 
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });

    return res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user.", error });
  }
}

// Delete user
export async function userDelete(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user.", error });
  }
}