const express=require("express")
const route=express.Router()
const categoryController=require("../controllers/category.controller");
const {AuthUser} = require("../utils/authorization") 

route.post("/create",AuthUser,categoryController.createCategory.handler);
route.get("/get",categoryController.getAllCategory.handler);
route.put("/update/:id",AuthUser,categoryController.updateCategory.handler);
route.delete("/delete/:id",AuthUser,categoryController.deleteCategory.handler);

module.exports=route;