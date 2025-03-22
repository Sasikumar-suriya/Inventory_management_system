const express = require('express');
const router = express.Router();

const userRoute=require("./user.route");
const categoryRoute=require("./category.route");
const productRoute=require("./product.route");

router.use("/user",userRoute);
router.use("/category",categoryRoute);
router.use("/product",productRoute);

module.exports = router;
