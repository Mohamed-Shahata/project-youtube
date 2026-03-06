import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const regitser = async (req, res) => {
  const { name, age, email, gender, password } = req.body;

  if (name.length < 5) {
    return res.status(400).json({
      success: false,
      message: "The name must be longer 5 characters",
    });
  } else if (age < 12 && age > 100) {
    return res.status(400).json({
      success: false,
      message: "The age must be longer 12 and less than 100",
    });
  } else if (gender !== "male" && gender !== "female") {
    return res.status(400).json({ success: false, message: "invalid gender" });
  } else if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "The password must be longer 8 characters",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  console.log(hashPassword);

  const user = await User.create({
    name,
    age,
    email,
    gender,
    password: hashPassword,
  });

  const token = jwt.sign(
    { id: user._id, name, role: user.role },
    "secretkey123",
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    // XSS
    httpOnly: true,
    secure: false, // http
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    sucess: true,
    message: "created new user",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      role: user.role,
    },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && matchPassword) {
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      "secretkey123",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      // XSS
      httpOnly: true,
      secure: false, // http
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ success: true, mesasge: "Login successfully", token });
  } else {
    res.status(404).json({ success: false, mesasge: "user not found" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};
