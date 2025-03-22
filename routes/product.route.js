const express=require("express")
const route=express.Router()
const productController=require("../controllers/product.controller");
const {AuthUser} = require("../utils/authorization");
const configureMulter=require("../utils/fileuUploads");

route.post("/create",AuthUser,configureMulter({ allowMultipleFiles: true }),productController.createProduct.handler);
route.get("/get",productController.getProducts.handler);
route.put("/update/:id",AuthUser,configureMulter({ allowMultipleFiles: true }),productController.updateProduct.handler);
route.delete("/delete/:id",AuthUser,productController.deleteProduct.handler);

module.exports=route;