const { Users } = require('../models');
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { generateToken,generateRecoveryToken,verifyResetToken}=require("../utils/authorization")
const { sendEmail } = require('../utils/emailService'); // Import the sendEmail function
const mailTemplate = require('../utils/emailTemplates');


const createUser={
    validation: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required().messages({
          'string.email': 'Invalid email format',
          'any.required': 'Email is required'
        }),
        role: Joi.string().optional(),
        password: Joi.string()
          .required()
          .min(8)
          .pattern(/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/)
          .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special character'
          }),
        contact: Joi.string()
          .optional()
          .pattern(/^\d{10}$/)
          .messages({
            'string.pattern.base': 'Contact must be exactly 10 digits'
          })
      }),
    handler:async(req,res)=>{
        console.log(req.body);
        try{
            console.log(req.body);

            const { error } = createUser.validation.validate(req.body);
            if (error) {
              return res.status(400).json({ message: error.details.map(detail => detail.message).join(', ') });
            }
            
            const {email , contact, password} = req.body;

            const existingEmail = await Users.findOne({
                where:{email:email}
            })

            if(existingEmail){
                return res.status(400).json({ message: 'User with this email already exist' });
            }

            const existingContact = await Users.findOne({
                where:{contact:contact}
            })

            if(existingContact){
                return res.status(400).json({ message: 'User with this contact already exist' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const filePaths = {};
            if (req.files && Array.isArray(req.files)) {
                req.files.forEach(file => {
                filePaths[file.fieldname] = file.path;  
                 });
            }

         
            const newUser = await Users.create({
              name:req.body.name,
              email,
              contact,
              password: hashedPassword, 
              role: req.body.role || 'user',
              ...filePaths
            });
            const token = generateToken(newUser);

            res.status(201).json({
              message: 'New user created successfully',
              data: {
                ...newUser.toJSON(), 
                token: token 
              }
            });
      
        }catch(error){
            console.error(error);
            res.status(500).json({ message: error.message || "An error occurred while creating the user." });
        }
    }
}
const userLogin = {
  validation: Joi.object({
    email: Joi.string().required(),  
    password: Joi.string().required(), 
  }),

  handler: async (req, res) => {
  
    try {
      
      const { error } = userLogin.validation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const {email,password}=req.body;

      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ message: "You dont have an account create new" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken(user);
  

      res.status(200).json({
        message: "Login successful",
        token,  
        userId: user.id,
        Name: user.name,
        Email: user.email,
      });


    } catch (error) {
      console.error( error);
      res.status(500).json({ message: error.message || "Something went wrong" });
    }
  }
};
const forgotPassword = {
  handler: async (req, res) => {

    try {
      const { email } = req.body; 

      const user = await Users.findOne({ where: { email: email } });
      console
      if (!user) {
        return res.status(404).json({ message: 'User with this email not found' });
      }

      const recoveryToken =  generateRecoveryToken(user);
      user.dataValues.recoveryToken=recoveryToken;
      console.log(user.dataValues);

      const resetLink = `http://localhost:8000/user/resetpassword?token=${recoveryToken}`;

      const emailContent = mailTemplate.PasswordReset(user.name, user.email, resetLink);

      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        html: emailContent,
      });

      return res.status(200).json({ message: 'Password reset link sent to your email',user:user});

    } catch (error) {
      console.error("Error in sending password reset email:", error);
      return res.status(500).json({ message: error.message || 'Something went wrong' });
    }
  }
};

const resetPassword = {
  validation: Joi.object({
    newPassword: Joi.string().required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
      .message('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character')
      .required(),
    confirmPassword: Joi.string().required(),
  }),
  handler: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords does not match' });
      }

      const token = req.headers['resettoken'];

      if (!token) {
        return res.status(400).json({ message: 'Token is required for password reset' });
      }

      const decoded = verifyResetToken(token);  

      const userId = decoded.userId;

      // Fetch user based on the decoded userId
      const user = await Users.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Password has been successfully reset' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  }
};
module.exports={
    createUser,
    userLogin,
    forgotPassword,
    resetPassword
}