import { prop, getModelForClass, modelOptions, Index, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";

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

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  // @prop({ default:[] })
  // public favorite_ids: Ref<>[]

  @prop({ type: () => Address })
  public address?: Address;
}

export const UserModel = getModelForClass(User);
