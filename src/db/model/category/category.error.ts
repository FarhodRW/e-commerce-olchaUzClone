import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class CategoryError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.CATEGORIES, 'Category with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.CATEGORIES + 1, 'Category with this details already exists', data);
  };

}