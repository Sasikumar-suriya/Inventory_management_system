const express = require('express');
const router = express.Router();

const userRoute=require("./user.route");
const categoryRoute=require("./category.route");

router.use("/user",userRoute);
router.use("/category",categoryRoute);
module.exports = router;
