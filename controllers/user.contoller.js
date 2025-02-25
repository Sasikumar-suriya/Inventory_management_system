const { Users } = require('../models');

const Joi = require("joi");
const bcrypt = require("bcryptjs");

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

            res.status(201).json({ message : "New user created successfully",data:newUser});
        }catch(error){
            console.error(error);
            res.status(500).json({ message: error.message || "An error occurred while creating the user." });
        }
    }
}

module.exports={
    createUser
}