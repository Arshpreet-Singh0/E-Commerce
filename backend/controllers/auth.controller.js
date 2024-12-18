import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ejs from 'ejs';
import { transporter } from "../utils/nodemailer.js";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../templates/emailVerification.ejs');
// console.log('Template Path:', templatePath);

export const getUser = async (req, res, next) => {
  try {
    const id = req.id;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }
    const cart = await Cart.find({ user: user._id });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      profile: user.profile,
      address: user.address,
    };

    return res.status(200).json({
      success: true,
      user,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    let { name, email, phone, password, role } = req.body;

    if (!role) role = "user";

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    //generate verification url and send email to user
    const url = `${process.env.APP_URL}/user/verify/${verificationToken}`;
    const htmlContent = await ejs.renderFile(templatePath, {
      username: user.name,
      verifyUrl: url,
    });

    await transporter.sendMail({
      from: `"ShopIt" <${process.env.NODE_MAILER_USER}>`,
      to: user.email,
      subject: "Verify your email",
      text: `Please click on this link to verify your email: `,
      html: htmlContent,
    });

    return res.status(200).json({
      message: "Account created successfully, verify you email before login.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password, role } = req.body;

    if (!role) role = "user";

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email first",
        success: false,
      });
    }

    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (user.role && user.role != role) {
      return res.status(400).json({
        message: "Account does not exist with correct role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      address: user.address,
    };
    const cart = await Cart.find({ user: user._id });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None", // Allows cross-origin cookies
        secure: true,
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        cart,
        success: true,
      });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    user.verified = true;
    await user.save();
    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, address } = req.body;

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phone,
      address: address,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    const { newpassword } = req.body;

    if (!newpassword) {
      return res.status(400).json({
        message: "Please Enter new Password to update",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    const response = await user.save();

    return res.status(200).json({
      message: "Password Changed successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const resendEmail = async (req, res, next)=>{
  try {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message: "User not found",
        success: false,
      })
    }

    if(user.verified){
      return res.status(400).json({
        message: "Email already verified",
        success: false,
      })
    }
    const verificationToken = jwt.sign({id:user._id}, process.env.SECRET_KEY, {
      expiresIn : "7d",
    });

    //generate verification url and send email to user
    const url = `${process.env.APP_URL}/user/verify/${verificationToken}`;
    const htmlContent = await ejs.renderFile(templatePath, {
      username: user.name,
      verifyUrl: url,
    });

    await transporter.sendMail({
      from: `"ShopIt" <${process.env.NODE_MAILER_USER}>`,
      to: email,
      subject: "Verify your email",
      text: `Please click on this link to verify your email: `,
      html: htmlContent,
    });

    res.status(200).json({
      message: "Email sent successfully",
      success: true,
    })

  } catch (error) {
    console.log(error);
    next(error);
  }
}