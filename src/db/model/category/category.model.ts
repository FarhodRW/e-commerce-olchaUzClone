import { prop, getModelForClass, modelOptions, Index } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel, Language } from "../baseModel";


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.CATEGORIES
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


export class Category extends BaseModel {
  @prop({ required: true, type: () => Language })
  public title!: Language;

  @prop({ required: true })
  public image: string;

  @prop({})
  public parentId?: string;

}


export const CategoryModel = getModelForClass(Category);
