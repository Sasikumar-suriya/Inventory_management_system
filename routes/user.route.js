const express=require("express")
const route=express.Router()
const userController=require("../controllers/user.contoller");
const configureMulter=require("../utils/fileuUploads")

route.post("/create",configureMulter({ allowMultipleFiles: true }),userController.createUser.handler);
route.post("/login",userController.userLogin.handler);
route.post("/forget-password",userController.forgotPassword.handler);
route.post("/reset-password",userController.resetPassword.handler);

module.exports=route;