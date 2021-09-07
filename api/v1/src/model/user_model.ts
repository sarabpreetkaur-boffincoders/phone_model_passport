
import { prop, getModelForClass } from "@typegoose/typegoose";
export class UserRecord {
  @prop()
  name!: string;

  @prop()
  email!: string;

  @prop()
  password!: string;

}
const user_record_model = getModelForClass(UserRecord, {
  schemaOptions: {
    collection: "users_data",
  },
});
export default user_record_model;
