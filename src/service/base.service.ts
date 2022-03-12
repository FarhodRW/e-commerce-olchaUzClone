import { Model } from 'mongoose'

export async function findPaging<T>(model: Model<T>, query, page: number, limit: number, add_pipeline?, sort?) {

  const $match = {
    $match: query
  }
  const $skip = {
    $skip: (page - 1) * limit
  }
  const $limit = {
    $limit: limit
  }

  const $sort = {
    $sort: sort
  }

  const pipeline = [
    $match,
    $sort,
    $skip,
    $limit,
    ...add_pipeline
  ]

  const total = await model.countDocuments(query);
  const data = await model.aggregate(pipeline)

  return {
    total,
    data
  }
}