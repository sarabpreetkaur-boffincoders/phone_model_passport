import{Expose,Type} from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";


export class PhoneViewModel{
    @Expose()
    @IsString()
    @ IsDefined()
   camera!:string;

    @Expose()
    @IsDefined()
    @IsString()
    brand!:string;

    @Expose()
    @IsDefined()
    @IsNumber()
    storage!:number;

    @Expose()
    @IsString()
    @IsDefined()
    speakers!:string;

    @Expose()
    @IsString()
    @IsDefined()
    new_features!:string;


}

