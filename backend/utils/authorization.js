const { Users } = require("../models");
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const AuthUser = async (req, res, next) => {
  try {
   
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    console.log('Token received:', token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded Token:', decoded);

    const userId = decoded.userId;
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.authUser = user;  
    next();  
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err.message || 'Invalid or expired token' });
  }
};
const generateRecoveryToken = (user) => {
  console.log("RESET_SECRET_KEY: ", process.env.RESET_SECRET_KEY);  
  const payload = {
    userId: user.id,  
  };

  const token = jwt.sign(payload, process.env.RESET_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const verifyResetToken = (token) => {
  try {
    
    const secretKey = process.env.RESET_SECRET_KEY;

    console.log('Using secretKey for Reset Token:', secretKey);
    
   
    return jwt.verify(token, secretKey); 
  } catch (err) {
    throw new Error("Invalid or expired password reset token");
  }
};
module.exports = {
  generateToken,
  AuthUser,
  generateRecoveryToken,
  verifyResetToken
};
