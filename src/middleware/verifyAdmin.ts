import { UserModel } from "../db/model/user/user.model"
import jwt from 'jsonwebtoken'
import { UserDefinedError } from "../db/common/common.error"

export const verifyAdminToken = (req: any, res: any, next: any) => {
  const authAdminToken = req.headers.authorization

  if (authAdminToken) {
    const token = authAdminToken.split(' ')[1]
    jwt.verify(token, process.env.JWTADMINKEY, async (err: any, data: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      console.log(data)
      const user = await UserModel.findById(data._id)
      if (!user) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      console.log(user)
      next()
    })
  }
  else { return res.status(401).send('You are not authenticated') }
}


export async function verifyAdmin(req, res, next) {
  try {
    console.log(String(req.user.isAdmin))
    if (!req.user.isAdmin) throw UserDefinedError.NotEnoughPermission(req.user._id)
    next()
  } catch (e) {
    next(e)
  }
}

export async function verifySuperAdmin(req, res, next) {
  try {
    console.log(String(req.user.isSuperAdmin))
    if (!req.user.isAdmin) throw UserDefinedError.NotEnoughPermission(req.user._id)
    next()
  } catch (e) {
    next(e)
  }
}



