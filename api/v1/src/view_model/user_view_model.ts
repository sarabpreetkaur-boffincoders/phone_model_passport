import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsString } from "class-validator";

export class UserViewModel{
    @Expose()
    @IsDefined()
    @IsString()
    name!:string;

    @Expose()
    @IsDefined()
    @IsString()
    password!:string;

    @Expose()
    @IsEmail()
    @IsDefined()
    email!:string;
}