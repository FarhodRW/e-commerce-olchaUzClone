import { UserDefinedError } from "../db/common/common.error"
import { success } from "../middleware/helpers"


export async function uploadController(req, res) {
  if (!req.file) throw UserDefinedError.UnknownError('file upload error');

  success(res, req.file.path)
}