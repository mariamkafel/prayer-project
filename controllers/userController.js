const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.signin = async (req, res) => {
  const {username, password ,email} = req.body;

  try {
    // Hash the password with 10 salt rounds (it defines how many times the hashing algo will run where it will make it more secure)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user with the hashed password
    await userModel.insertUser(username, hashedPassword,email);

    res.status(200).json({
      at:"sginin ",
      message: "Insert successful",
      code: 200
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({
      at:"signin",
      message:"Server error while creating user.",
      code:400
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await userModel.findUserByUsername(username);

    if (users.length === 0) {
      console.log("DEBUG: No user found for", username);
      return res.status(401).json({
        at:"login",
        message:"Invalid username",
        code:401
      });
    }

    const userFromDB = users[0];
    
    const isPasswordValid = await bcrypt.compare(password, userFromDB.password);
    if (!isPasswordValid) {
      return res.status(402).json({
        at:"login",
        message:"Invalid username or password",
        code:402
      });
    }

    const payload = { name: username };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '170s' });

    res.json({
      accessToken,
      message: "Login was successful",
      code: 200
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({at:"login",

      message:"Server error during login.",
      code:203
    });
  }
};


exports.get_login_info = async (req, res) => {
  try {
    const info = { 
  name: req.user.name, 
  email: req.user.email 
};

    // const users = await userModel.findUserByUsername(username);
    // if (users.length === 0) {
    //   return res.status(404).json({
    //     at:"get_login_info",
    //     message:"User not found",
    //     code:"403"
        
    //   });
    // }
    
    // res.json(users[0]);
    res.json(info);

  } catch (error) {
  res.status(400).json({
    at:"get_login_info",
    mssage:"Server error while getting user info.",
    code:404
  });
  }
};