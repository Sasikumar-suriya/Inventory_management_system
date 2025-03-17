const { where , Op, Sequelize} = require('sequelize');
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

const getAllCategory={
  validation: Joi.object({
    sortBy: Joi.string().default("createdAt"),
    search: Joi.string()
      .allow("")
      .custom((value, helpers) => {
        const regexEscapeCharacter = /[\[\]\\()^$.\-|?*+{}]/g;
        if (regexEscapeCharacter.test(value)) {
          value = value.replace(regexEscapeCharacter, "\\$&");
        }
        return value;
      }),
    sortOrder: Joi.string().valid("ASC", "DESC").default("DESC"),
    offset: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    id: Joi.string().uuid().optional(),
  }),
  handler:async(req,res)=>{
    try{
      const { error, value } = getAllCategory.validation.validate(req.query);
      if (error) {
        return res.status(400).json({ message: error.details.map((detail) => detail.message).join(", ") });
      }
      const { sortBy, offset, limit,search,id,sortOrder } = value;

      let whereClause = {};

      if(id){
       whereClause.id=id;
      }

      if (search && search.trim()) {
        whereClause[Op.or] = {
          categoryName: { [Op.like]: `%${search}%` },
        };
      }
      
      const{count,rows}=await Category.findAndCountAll({
        where:whereClause,
        order: [[sortBy, sortOrder]],
        offset: (offset - 1) * limit,
        limit: limit,
        raw: false,
      })

      res.status(200).json({
        total: count,
        result: rows,
      });

    }catch(error){
      console.error(error);
      res.status(500).json({ message: error.message || "An error occurred something went wrong" });
    }
  }
}

const updateCategory = {
  validation: Joi.object({
    categoryName: Joi.string().optional(), 
    description: Joi.string().optional(), 
  }),

  handler: async (req, res) => {
    console.log(req.body);
    try {
      const { error } = updateCategory.validation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = req.authUser;
      console.log("user=>",user);
      if (user.role !== "admin") {
        return res.status(400).json({ message: 'Only admin can update categories.' });
      }

      const categoryId = req.params.id; 
      
      const category = await Category.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }

      const updatedCategory = await category.update(req.body);

      return res.status(200).json({
        message: 'Category updated successfully.',
        data: updatedCategory,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message || "An error occurred while updating the category.",
      });
    }
  },
};

const deleteCategory={
  handler:async(req,res)=>{
    try{
    const categoryId=req.params.id;

    const category=await Category.findOne({
      where:{id:categoryId}
    })

    if(!category){
      return res.status(404).json({ message: 'Category not found.' }); 
    }

    const user=req.authUser;
    console.log("user=>",user);

    if(user.role !== "admin"){
      return res.status(400).json({ message: 'Only admin can delete category.' }); 
    }

    await category.destroy();

    return res.status(200).json({ message: 'Category deleted successfully.'});

    }catch(error){
      res.status(500).json({
      message: error.message || "An error occurred while updating the category.",
      }); 
    }
  }
}
module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
};
