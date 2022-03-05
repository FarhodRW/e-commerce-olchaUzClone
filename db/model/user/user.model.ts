import { prop, getModelForClass } from "@typegoose/typegoose";

class Address {
  @prop({ type: () => String })
  public street!: string;

  @prop({ type: () => String })
  public city!: string;

  @prop({ type: () => String })
  public postCode!: string;
}

export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ type: () => Address })
  public address?: Address;
}

export const UserModel = getModelForClass(User);
