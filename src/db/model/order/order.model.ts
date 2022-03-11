import { prop, getModelForClass, modelOptions, Index, mongoose, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel, Language } from "../baseModel";
import { Types } from 'mongoose'
import { User } from "../user/user.model";
import { Product } from "../product/product.model";


export enum ORDER_STATE {
  PENDING = 'pending',
  DONE = 'done',
  CANCELED = 'canceled',
  IN_PROGRESS = 'in_progress'
}


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.ORDERS
  }
})
export class Order extends BaseModel {

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.USERS
  })
  userId: Ref<User>;

  @prop({ required: true })
  public amount: number;

  @prop({})
  public address: string;

  @prop({ enum: ORDER_STATE, default: ORDER_STATE.PENDING })
  public state?: ORDER_STATE;

  @prop({ default: 0 })
  total_price: number;

  @prop({ default: 0 })
  total_cost: number;

  @prop({ default: 0 })
  total_discount: number;

  @prop({ default: 0 })
  delivery_price: number;

  @prop({ default: 0 })
  total_tax: number;

  @prop({ default: 0 })
  total_purchase: number;

}


export const OrderModel = getModelForClass(Order);
