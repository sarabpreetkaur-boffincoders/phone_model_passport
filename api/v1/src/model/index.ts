import mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
export class Phone {
  @prop()
  camera!: string;

  @prop()
  storage!: number;

  @prop()
  brand!: string;

  @prop()
  speakers!: string;

  @prop()
  new_features!: string;
}
const phone_detail_model = getModelForClass(Phone, {
  schemaOptions: {
    collection: "phones",
  },
});
export default phone_detail_model;
