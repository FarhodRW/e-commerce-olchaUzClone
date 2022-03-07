import { UserModel } from "../db/model/user/user.model"
import jwt from 'jsonwebtoken'
import { UserDefinedError } from "../db/common/common.error"

export const verifyToken = (req: any, res: any, next: any) => {
  const authToken = req.headers.authorization

  if (authToken) {
    const token = authToken.split(' ')[1]
    jwt.verify(token, process.env.JWTKEY, async (err: any, data: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      console.log(data)
      const user = await UserModel.findById(data._id)
      if (!user) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next()
    })
  }
  else { return res.status(401).send('You are not authenticated') }
}

// export async function verifyAdmin(req, res, next) {
//   try {
//     if (!req.user.isAdmin) throw UserDefinedError.NotEnoughPermission(req.user._id)
//     next()
//   } catch (e) {
//     next(e)
//   }
// }

