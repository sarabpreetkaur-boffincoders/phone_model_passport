import { Router, Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import STATUS_CODES from "http-status";
import Utility, { Validation, IAPIResponse } from "../common";
import Phoneservice from "../services";
import { PhoneViewModel } from "../view_model/phone_view_model";
import { UserViewModel } from "../view_model/user_view_model";
class Phone_detail {
  phone_detail_controller = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let Validated_Result: Validation = await Utility.ConvertWhileValidating(
        PhoneViewModel,
        req.body
      );
      if (Validated_Result.error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "error",
          error: Validated_Result.error,
        });
      } else {
        let New_model: PhoneViewModel = Validated_Result.data as PhoneViewModel;
        let Model_result = await Phoneservice.phoneData(New_model, req);
        if (Model_result) {
          return res.status(STATUS_CODES.OK).send({
            success: true,
            message: "dummy created",
            data: Model_result,
          });
        } else {
          return res.status(STATUS_CODES.BAD_REQUEST).send({
            success: false,
            message: "dummy can't be created",
            error: [JSON.stringify(Model_result)],
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.send({
        success: false,
        message: err,
      });
    }
  };

  user_signup_controller = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let Validated_Result: Validation = await Utility.ConvertWhileValidating(
        UserViewModel,
        req.body
      );
      if (Validated_Result.error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "failed",
          error: Validated_Result.error,
        });
      } else {
        let New_model: UserViewModel = Validated_Result.data as UserViewModel;
        let Model_result = await Phoneservice.user_signup_service(
          req,
          New_model
        );
        if (Model_result) {
          return res.status(STATUS_CODES.OK).send({
            success: true,
            message: "user created",
            data: Model_result,
          });
        } else {
          return res.status(STATUS_CODES.BAD_REQUEST).send({
            success: false,
            message: "user can't be created",
            error: [JSON.stringify(Model_result)],
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  };
 user_login_controller= async( req: Request,
  res: Response<IAPIResponse>,
  next: NextFunction)=>{
   try{
     let login_data= await Phoneservice.user_login_service(req);
     if(login_data){
       return res.send({
         success:true,
         data:login_data,
         message:"login successfully"
       })
     }
     else{
      return res.send({
        success:false,
        message:"login failed"
      })
     }
   }
   catch(error){
    
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      })
     
   }
 }


}
export default new Phone_detail();
