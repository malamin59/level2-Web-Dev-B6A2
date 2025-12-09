import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";
const auth = (...roles : ('admin' | 'user')[]) =>{

  console.log("get role from auth page . user role is ---->>", 
    roles);
  
 return async(req: Request, res: Response,next: NextFunction) =>{
const authHeader = req.headers.authorization;

const token = authHeader?.split("")[1]

if(!token) {
    throw Error("you are not authorize")
}
const secretToken = process.env.SECRET

if(!secretToken) {
      throw new Error("JWT secret not defined in environment variables");
}
const decoded = jwt.verify(token , secretToken, ) as JwtPayload
console.log(decoded)
const user =  await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [decoded.email])
  if(user.rows.length === 0) {
    throw Error("user not fount!")
  }
  if(roles.length && !roles.includes(decoded.role)){
        throw Error(" you are not authorize (role not found)!")
  }
req.user = decoded
 next()


    }
}


export default auth