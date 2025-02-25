const express=require("express")
const route=express.Router()
const userController=require("../controllers/user.contoller");
const configureMulter=require("../utils/fileuUploads")

route.post("/create",configureMulter({ allowMultipleFiles: true }),userController.createUser.handler);

module.exports=route;