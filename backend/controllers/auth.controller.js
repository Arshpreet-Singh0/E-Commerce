import User from "../models/user.model.js";
import Cart from "../models/cart.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import getDataUri from "../utils/dataURI.js";
// import cloudinary from "../utils/claudinary.js";

export const getUser = async(req, res, next)=>{
  try {
    const id = req.id;

    const user = await User.findById(id);
    
    if(!user){
      return res.status(404).json({
        success : false,
      })
    }

    return res.status(200).json({
      success : true,
      user,
    })
  } catch (error) {
    next(error);
  }
}

export const signup = async (req, res, next) => {
  try {
    let { name, email, phone, password, role } = req.body;
    
    if(!role) role='user';
    

    if (!name || !email || !phone || !password) {
      
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // const file = req.file;

    // const fileUri = getDataUri(file);

    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    
    

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response =  await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    // console.log(response);
    

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

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

    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if(user.role && user.role!=role){
      return res.status(400).json({
        message : 'Account does not exist with correct role',
        success : false,
      })
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
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    const cart = await Cart.find({user:user._id});

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
    const { fullname, email, phoneNumber, address} = req.body;

  
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
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;


    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address : address,
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
export const updatePassword = async(req, res)=>{
  try {
    const {email, password} = req.body;

  const user = await UserModel.findOne({email});

  const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    const {newpassword} = req.body;

    if(!newpassword){
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
}

