import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class ReviewError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.REVIEWS, 'Review with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.REVIEWS + 1, 'Review with this details already exists', data);
  };

}