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
