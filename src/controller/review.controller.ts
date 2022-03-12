import { ReviewDto, ReviewDtoGroup, ReviewGetDto } from "../db/dto/review.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createReviewService, deleteReviewService, getReviewPagingService, updateUserReviewService } from "../service/review.service"

export async function createReviewController(req, res, next) {

  try {
    const dto = await validateIt(req.body, ReviewDto, ReviewDtoGroup.CREATE)
    dto.createdBy = req.user._id
    console.log(req.user._id)
    console.log(dto)
    const newReview = await createReviewService(dto)
    success(res, newReview)
  } catch (err) {
    next(err)
    console.log(err);

  }
}



export async function updateReviewController(req, res, next) {
  try {
    req.body.createdBy = req.user._id
    const query = req.params.id
    const dto = await validateIt(req.body, ReviewDto, ReviewDtoGroup.UPDATE)
    console.log(dto)
    const user = await updateUserReviewService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteReviewController(req, res, next) {
  try {
    const query = req.params.id
    const user = await deleteReviewService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}


export async function getReviewPagingController(req, res, next) {
  try {
    const data = await validateIt(req.body, ReviewGetDto, ReviewDtoGroup.GET_PAGING);

    const Reviews = await getReviewPagingService(data)

    success(res, Reviews)
  } catch (error) {
    next(error)
  }
}