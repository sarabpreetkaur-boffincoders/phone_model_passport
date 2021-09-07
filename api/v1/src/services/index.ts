import { errorResponse } from "../common";
import { PhoneViewModel } from "../view_model/phone_view_model";
import phone_detail_model, { Phone } from "../model/index";
import user_record_model, { UserRecord } from "../model/user_model";
import { UserViewModel } from "../view_model/user_view_model";
import bcrypt from "bcrypt"; 
import httpStatus from "http-status";
import { Request } from "express";
import { Profile } from "passport";
class Phoneservice {
  phoneData = async (
    New_model: PhoneViewModel,
    req: Request
  ): Promise<Phone | errorResponse> => {
    try {
      let phone_dummy = await phone_detail_model.create(New_model);
      if (phone_dummy) return phone_dummy;
      else {
        return {
          message: "phone_dummy not created",
          error: "An error occured while creating it",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Internal server error",
        error: "An error occured",
      };
    }
  };
  user_signup_service = async (
    req: Request,
    user_services: UserViewModel
  ): Promise<UserRecord | errorResponse> => {
    try {

      const salt = await bcrypt.genSalt(10);
      user_services.password = await bcrypt.hash(
        user_services.password,
          salt
        );
      let user_signup = await user_record_model.create(user_services);
      if (user_signup) {
        return user_signup;
      } else {
        return {
          message: "error occured during signup",
          error: "usermodel not created.",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "An error occured.",
        error: "Internal server error",
      };
    }
  };
  user_login_service= async(req:Request)=>{
    try{
         let found_user=req.user as Profile;
         let existing_user=await user_record_model.findOne({
           email:found_user.emails[0].value
         })
         if(existing_user){
           return existing_user;
          }
          else{
            let model_to_save={email:found_user.emails[0].value,
              name:found_user.emails[0].value.replace(/@.*$/,""),
              password:found_user.emails[0].value.slice(0,4) +
              "@"+
              (Math.random() * 10) +
            (Math.random() * 10) 

            }
            
            let new_user= await user_record_model.create(model_to_save)
            if(new_user)
            return{
              
             new_user
            }
          }
    }
    catch(error){
      return{
        message: "An error occured.",
        error: "Internal server error",
      }
    }
  }
}

export default new Phoneservice();
