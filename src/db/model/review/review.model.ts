import { prop, getModelForClass, modelOptions, Index, mongoose, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Types } from 'mongoose'
import { Product } from "../product/product.model";
import { User } from "../user/user.model";



@modelOptions({
  schemaOptions: {
    collection: CollectionNames.REVIEWS
  }
})

// @Index({
//   title: 1
// }, {
//   name: 'title',
//   unique: true,
//   background: true,
//   partialFilterExpression: {
//     isDeleted: false
//   }
// })




export class Review extends BaseModel {

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.PRODUCTS
  })
  productId: Ref<Product>;

  @prop({})
  public rating: number;

  @prop({})
  public comment: string;

}


export const ReviewModel = getModelForClass(Review);
