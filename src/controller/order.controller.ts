import { OrderDto, OrderDtoGroup } from "../db/dto/order.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createOrderService, deleteOrderService, getOrderByIdService, updateUserOrderService } from "../service/order/order.service";
import { createOrderItemService, getOrderItemsByOrderIdService } from "../service/order/order-item.service";
import { getProductByIdService } from "../service/product.service";

export async function createOrderController(req, res, next) {

  try {
    const dto = await validateIt(req.body, OrderDto, OrderDtoGroup.CREATE)
    dto.createdBy = req.user._id;
    const order = await createOrderService(dto)

    dto.total_cost = 0;
    dto.total_discount = 0;
    dto.total_price = 0;
    dto.total_purchase = 0;
    for (const item of dto.products) {
      const product = await getProductByIdService(item.productId);
      item.orderId = order._id;
      item.categoryId = product.categoryId;
      item.cost = product.cost;
      item.price = product.price;
      if (product.on_discount) {
        item.discount = product.price * product.discount_value;
      } else item.discount = 0;
      if (product.has_tax) {
        item.tax = product.price * product.tax;
      } else item.tax = 0;
      dto.total_cost += item.cost;
      dto.total_discount += item.discount;
      dto.total_price += item.price;
      await createOrderItemService(item);
    }
    success(res, order._id)
  } catch (err) {
    next(err)
    console.log(err);

  }
}

export async function getOrderByIdController(req, res, next) {
  try {

    const id = req.params.id;

    const order = await getOrderByIdService(id);

    const items = await getOrderItemsByOrderIdService(order._id);

    const response = {
      ...order,
      items
    }

    success(res, response);
  } catch (error) {
    next(error)
  }
}

export async function updateOrderController(req, res, next) {
  try {
    const query = req.params.id
    const dto = await validateIt(req.body, OrderDto, OrderDtoGroup.UPDATE)
    console.log(dto)
    const user = await updateUserOrderService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteOrderController(req, res, next) {
  try {
    const query = req.params.id
    const user = await deleteOrderService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}