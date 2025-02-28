const { Category } = require('../models');
const Joi = require("joi");

const createCategory = {
  validation: Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string().optional(),
  }),

  handler: async (req, res) => {
    console.log(req.body);
    try {
      // Validate the request body
      const { error } = createCategory.validation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = req.authUser;
      console.log(user);
      if(user.role !== "admin"){
        return res.status(400).json({ message: 'only admin can create categories.' });
      }
      // Check if the category already exists
      const category = await Category.findOne({
        where: { categoryName: req.body.categoryName },
      });

      if (category) {
        return res.status(400).json({ message: 'This category already exists.' });
      }

      // Create a new category since it doesn't exist
      const newCategory = await Category.create({
        createdBy: user.id,
        ...req.body,
      });

      return res.status(200).json({ message: 'Category created successfully.', data: newCategory });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || "An error occurred while creating the category." });
    }
  },
};

module.exports = {
  createCategory,
};
