const express=require("express")
const route=express.Router()
const categoryController=require("../controllers/category.controller");
const {AuthUser} = require("../utils/authorization") 

route.post("/create",AuthUser,categoryController.createCategory.handler);


module.exports=route;