import bcryptjs from "bcryptjs";
import { validate } from "email-validator";
import validator from "email-validator";

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.username) {
      if (req.body.username.length < 5 || req.body.username.length > 20) {
        return next(
          errorHandler(
            400,
            "Username must be at least 5 characters and maximum 20 characters."
          )
        );
      }

      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces."));
      }
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters.")
        );
      }

      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.email) {
      const validEmail = validator.validate(req.body.email);
      if (!validEmail) {
        return next(errorHandler(400, "Please enter a valid email address."));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.id)
    return next(errorHandler(401, "Unauthorized to delete."));

  try {
    await User.findByIdAndDelete(req.params.id);
    if (req.user.id === req.params.id) {
      res.clearCookie("access_token");
    }
    res.status(200).json("User Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(401, "Unauthorized to view users."));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password: pass, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};
