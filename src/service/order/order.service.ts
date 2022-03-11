
import { OrderError } from "../../db/model/order/order.error";
import { OrderModel } from "../../db/model/order/order.model";
import { OrderDto } from "../../db/dto/order.dto";
import { Types } from 'mongoose'
import { CollectionNames } from "../../db/common/common.model";

export async function createOrderService(dto: OrderDto) {
  const newOrder = new OrderModel(dto)
  await newOrder.save()
  return newOrder
}

export async function getOrderByIdService(id, isDeleted?: false) {

  const $match = {
    $match: {
      _id: new Types.ObjectId(id)
    }
  }

  const $lookup = {
    $lookup: {
      from: CollectionNames.USERS,
      let: { createdBy: '$createdBy' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$$createdBy', '$_id']
            }
          }
        },
        {
          $project: {
            _id: 1,
            name: 1
          }
        }
      ],
      as: 'createdBy'
    }
  }

  const $unwind = {
    $unwind: {
      path: '$createdBy',
      preserveNullAndEmptyArrays: true
    }
  }

  const $project = {
    $project: {
      __v: 0
    }
  }

  const pipeline = [$match, $lookup, $unwind, $project]

  const order = await OrderModel.aggregate(pipeline)

  if (!order.length || order[0].isDeleted && !isDeleted) throw OrderError.NotFound(id);

  return order.shift()
}

export async function updateUserOrderService(query, dto: OrderDto) {
  const Order = await OrderModel.findByIdAndUpdate(query, { $set: dto }, { new: true })
  if (!Order) throw OrderError.NotFound()
  return Order
}

export async function deleteOrderService(query) {
  const Order = await OrderModel.findByIdAndDelete(query)
  if (!Order) throw OrderError.NotFound()
  return Order
}


//mvp