import { OrderedProductsDto } from "../../db/dto/order.dto";
import { OrderItemModel } from "../../db/model/order/orde-item/order-item.model";
import { Types } from 'mongoose'

export async function createOrderItemService(orderItem: OrderedProductsDto) {

  return await OrderItemModel.create(orderItem)

}

export async function getOrderItemsByOrderIdService(orderId) {

  const items = await OrderItemModel.find({
    orderId: new Types.ObjectId(orderId)
  })

  return items;
}