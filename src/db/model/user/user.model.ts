import { prop, getModelForClass, modelOptions, Index, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Product } from "../product/product.model";

class Address {
  @prop({ type: () => String })
  public street!: string;

  @prop({ type: () => String })
  public city!: string;

  @prop({ type: () => String })
  public postCode!: string;
}

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.USERS
  }
})
@Index(
  {
    email: 1
  }, {
  name: 'email',
  unique: true,
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
}
)
export class User extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: [] })
  public favoriteIds: Ref<Product>[]

  @prop({ type: () => Address })
  public address?: Address;

  @prop({ default: false })
  public isAdmin: boolean;

  @prop({ default: false })
  public isSuperAdmin: boolean;
}

export const UserModel = getModelForClass(User);
