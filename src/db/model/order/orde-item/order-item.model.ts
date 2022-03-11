import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../common/common.model";
import { Product } from "../../product/product.model";
import { Types, Schema } from 'mongoose'
import { Order } from "../order.model";
import { Category } from "../../category/category.model";

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.ORDER_ITEMS
  }
})

@Index({
  orderId: 1,
  productId: 1
}, {
  unique: true,
  name: 'orderIdAndProductId',
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
})
export class OrderItem {
  @prop({
    ref: CollectionNames.ORDERS,
    type: Types.ObjectId,
    required: true
  })
  orderId: Ref<Order>;

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.PRODUCTS,
    required: true
  })
  productId: Ref<Product>;

  @prop({ required: true })
  public quantity: number;

  @prop({ default: 0 })
  discount: number;

  @prop({ default: 0 })
  price: number;

  @prop({ default: 0 })
  cost: number;

  @prop({
    ref: CollectionNames.CATEGORIES,
    type: Types.ObjectId
  })
  categoryId: Ref<Category>;
}

export const OrderItemModel = getModelForClass(OrderItem)