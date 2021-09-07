import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class Validation {
  data: any;
  error: any;
}
export class errorResponse {
  message: string;
  error: string;
}
export interface IAPIResponse{
  success:boolean;
  error?:string[];
  data?:any;
  message:string;

}
class Utility {
  ConvertWhileValidating = async (convertedData: any, body: any) => {
    const result = new Validation();
    result.data = plainToClass(convertedData, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        if (errors.length > 0) {
          result.error = errors.map((err) => err.constraints);
          return result;
        }
      }
    )
    return result;
  };
}
export default new Utility();
