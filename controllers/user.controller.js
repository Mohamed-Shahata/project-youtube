import User from "../models/user.schema.js";

export const getAllUsers = async (req, res) => {
  // console.log(req.user);
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    users,
  });
};

export const getUser = async (req, res, next) => {
  const id = req.params.userId;

  const user = await User.findById(id).select("-password");

  if (!user) return next(new Error("User not found", { cause: 404 }));

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res, next) => {
  const { name, age, gender } = req.body;
  const id = req.params.userId;

  const user = await User.findById(id).select("-password");

  if (!user) return next(new Error("User not found", { cause: 404 }));

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
  } else if (gender) {
    if (gender !== "male" && gender !== "female") {
      return res
        .status(400)
        .json({ success: false, message: "invalid gender" });
    }
  }

  user.name = name || user.name;
  user.age = age || user.age;
  user.gender = gender || user.gender;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.userId;

  const user = await User.findById(id);

  if (!user) return next(new Error("User not found", { cause: 400 }));

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
