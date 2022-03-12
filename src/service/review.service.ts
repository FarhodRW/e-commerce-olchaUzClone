
import { ReviewError } from "../db/model/review/review.error";
import { Review, ReviewModel } from "../db/model/review/review.model";
import { ReviewDto, ReviewGetDto } from "../db/dto/review.dto";
import { FilterQuery, Document, Types } from 'mongoose'
import { CollectionNames } from "../db/common/common.model";
import { findPaging } from "./base.service";
import { Product } from "../db/model/product/product.model";

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

export async function getReviewPagingService(dto: ReviewGetDto) {
  const { page, limit, productId } = dto;

  const query: FilterQuery<Review & Document> = {
    productId: new Types.ObjectId(productId), isDeleted: false
  }

  const $lookupCategory = {
    $lookup: {
      from: CollectionNames.USERS,
      localField: 'createdBy',
      foreignField: '_id',
      as: 'user'
    }
  }

  const $unwindCategory = {
    $unwind: {
      path: '$user',
      preserveNullAndEmptyArrays: true
    }
  }

  const $project = {
    $project: {
      _id: 1,
      title: 1,
      user: {
        _id: 1,
        name: 1
      },
      rating: 1,
      comment: 1
    }
  }

  const $sort = {
    createdAt: -1
  }

  const pipeline = [$lookupCategory, $unwindCategory, $project];

  const data = await findPaging(ReviewModel, query, page, limit, pipeline, $sort);
  console.log(data)
  return data;

}


//mvp