import { ReviewDto, ReviewDtoGroup } from "../dto/review.dto"
import { success } from "../middleware/helpers"
import { validateIt } from "../middleware/validation"
import { createReviewService, deleteReviewService, updateUserReviewService } from "../service/review.service"

export async function createReviewController(req, res, next) {

  try {
    req.body.createdBy = req.user._id
    const dto = await validateIt(req.body, ReviewDto, ReviewDtoGroup.CREATE)
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