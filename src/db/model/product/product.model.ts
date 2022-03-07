import { prop, getModelForClass, modelOptions, Index, mongoose, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel, Language } from "../baseModel";
import { Types } from 'mongoose'
import { Category } from "../category/category.model";



@modelOptions({
  schemaOptions: {
    collection: CollectionNames.PRODUCTS
  }
})
@Index({
  title: 1
}, {
  name: 'title',
  unique: true,
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
})




export class Product extends BaseModel {
  @prop({ required: true, type: () => Language })
  public title!: Language;

  @prop({ type: String, default: [] })
  public images!: mongoose.Types.Array<string>;

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.CATEGORIES
  })
  categoryId: Ref<Category>;

  @prop({ required: true })
  public price: number;

  @prop({})
  public description: string;

  @prop({})
  public inStock: boolean;

  @prop({})
  public quantity: number;
}


export const ProductModel = getModelForClass(Product);
