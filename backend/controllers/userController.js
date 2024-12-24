import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({
        statusCode: 404,
        message: "not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json({
        statusCode: 401,
        message: "Password dont match",
      });
    } else {
      const token = createToken(user._id);
      res.json({
        statusCode: 200,
        message: "login successfully",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 300,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        message: "user exists",
        statusCode: 300,
      });
    }

    if (validator.isEmail(email) === false) {
      return res.json({
        message: "email invalid",
        statusCode: 400,
      });
    }

    if (password.length < 8) {
      return res.json({
        message: "password too short",
        statusCode: 400,
      });
    }

    //Hashing password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      statusCode : 200 ,
      message: "user created",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Failed threw error",
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        statusCode: 200,
        token
      })
    }
    else {
      res.json({
        statusCode: 401,
        message : "wrong email or password"
      })
    }
    
  } catch (error) {
    console.error(error);
    res.json({
      error: error.message,
      message : "couldnt login as admin"
    })
    
  }
};

export { loginUser, registerUser, adminLogin };
