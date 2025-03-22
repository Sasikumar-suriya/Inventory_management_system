const { where, Op, Sequelize } = require('sequelize');
const { Category, Users, Product } = require('../models');
const Joi = require("joi");

const createProduct = {
    validation: Joi.object({
        productName: Joi.string().required(),
        description: Joi.string().optional(),
        categoryId: Joi.string().uuid().required(),
        priceOfone: Joi.number().required(),
        quantity: Joi.number().required(),
        brandName: Joi.string().required(),
        productColor: Joi.string().required(),
        height: Joi.string().optional(),
        width: Joi.string().optional(),
        weight: Joi.string().optional(),
        expireyDate: Joi.date().optional(),
        manufactureDate: Joi.date().optional()
    }),
    handler: async (req, res) => {
        try {
            const { error } = createProduct.validation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { productName, categoryId, brandName, ...otherDetails } = req.body;
            const normalizedProductName = productName
                .trim()
                .replace(/\s+/g, '')  // Remove all spaces
                .toLowerCase();

            const normalizedBrandName = brandName
                .trim()
                .replace(/\s+/g, '')  // Remove all spaces
                .toLowerCase();

            const user = req.authUser;
            if (user.role !== "admin") {
                return res.status(400).json({ message: 'only admin can Add Product.' });
            }

            const findProduct = await Product.findOne({
                where: {
                    productName: {
                        [Op.like]: `%${normalizedProductName.trim()}%`  // Use LIKE for case-insensitive search in MySQL
                    },
                    brandName: {
                        [Op.like]: `%${normalizedBrandName.trim()}%`  // Use LIKE for case-insensitive search in MySQL
                    }
                }
            })

            if (findProduct) {
                return res.status(400).json({ message: 'This product already exist go and update' });
            }

            const findCategory = await Category.findOne({
                where: { id: categoryId }
            })

            if (!findCategory) {
                return res.status(400).json({ message: 'Category Not found' });
            }

            const filePaths = {};
            if (req.files && Array.isArray(req.files)) {
                req.files.forEach(file => {
                    filePaths[file.fieldname] = file.path;
                });
            }


            const crateNewProduct = await Product.create({
                productName,
                brandName,
                categoryId,
                createdBy: user.id,
                ...filePaths,
                ...otherDetails
            })

            res.status(201).json({
                message: 'New product created successfully',
                data: crateNewProduct
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    }
}

const getProducts = {
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
        categoryId: Joi.string().uuid().optional(),

    }),
    handler: async (req, res) => {
        try {
            const { error, value } = getProducts.validation.validate(req.query);
            if (error) {
                return res.status(400).json({ message: error.details.map((detail) => detail.message).join(", ") });
            }
            const { sortBy, offset, limit, search, id, sortOrder, categoryId } = value;

            let whereClause = {};

            if (id) {
                whereClause.id = id;
            }
            if (categoryId) {
                whereClause.categoryId = categoryId;
            }

            if (search && search.trim()) {
                whereClause[Op.or] = {
                    categoryName: { [Op.like]: `%${search}%` },
                };
            }

            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: Category,
                        as: 'category'
                    },
                    {
                        model: Users,
                        as: 'user'
                    }
                ],
                order: [[sortBy, sortOrder]],
                offset: (offset - 1) * limit,
                limit: limit,
                raw: false,
            })

            res.status(200).json({
                total: count,
                result: rows,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "An error occurred something went wrong" });
        }
    }
}

const updateProduct = {
    handler: async (req, res) => {
        try {
            const user = req.authUser;
            console.log("user=>", user);


            if (user.role !== "admin") {
                return res.status(400).json({ message: 'Only admin can update product.' });
            }

            const productId = req.params.id;


            const product = await Product.findOne({
                where: { id: productId },
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            if (req.body.productName) {
                return res.status(400).json({ message: "Cannot update productName." });
            }

            if (req.body.categoryId) {
                return res.status(400).json({ message: "Cannot update categoryId." });
            }

            if (req.body.createdBy) {
                return res.status(400).json({ message: "Cannot update createdBy." });
            }

            const updateFields = {};

            for (const [key, value] of Object.entries(req.body)) {
                if (key !== 'productName' && key !== 'categoryId' && key !== 'createdBy' && value !== undefined) {
                    updateFields[key] = value;
                }
            }

            const filePaths = {};
            if (req.files && Array.isArray(req.files)) {
                req.files.forEach(file => {
                    filePaths[file.fieldname] = file.path;
                });

                Object.assign(updateFields, filePaths);
            }

            await product.update(updateFields);

            res.status(200).json({
                message: 'Product updated successfully.',
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    }
};

const deleteProduct = {
    handler: async (req, res) => {
        try {
            const user = req.authUser;
            console.log("user=>", user);


            if (user.role !== "admin") {
                return res.status(400).json({ message: 'Only admin can delete product.' });
            }

            const productId = req.params.id;


            const product = await Product.findOne({
                where: { id: productId },
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            await product.destroy();

            res.status(200).json({
                message: 'Product deleted successfully.',
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}