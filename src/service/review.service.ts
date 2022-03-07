
import { ReviewError } from "../db/model/review/review.error";
import { ReviewModel } from "../db/model/review/review.model";
import { ReviewDto } from "../dto/review.dto";

export async function createReviewService(dto: ReviewDto) {
  const newReview = new ReviewModel(dto)
  await newReview.save()
  return newReview
}



export async function updateUserReviewService(query, dto: ReviewDto) {
  const Review = await ReviewModel.findByIdAndUpdate(query, { $set: dto }, { new: true })
  if (!Review) throw ReviewError.NotFound()
  return Review
}

export async function deleteReviewService(query) {
  const Review = await ReviewModel.findByIdAndDelete(query)
  if (!Review) throw ReviewError.NotFound()
  return Review
}


//mvp