import bcrypt from "bcryptjs"
import { pool } from "../../database/db"
import jwt from "jsonwebtoken"

const loginUserInitDB = async(email: string, password: string) =>{
const user = await  pool.query(`
     SELECT * FROM USERS WHERE email=$1 
    `, [email]);

    if(user.rows.length === 0){
            throw Error("User not fount")
        }
    
    const hashedPassword = user.rows[0].password
    const matchPassword = await bcrypt.compare(password, hashedPassword)
//if user not found
if(!matchPassword) {
    throw Error("invalid password")
}

// Implement JTW(json web token)
const jwtPayload = {
id : user.rows[0].id,
name : user.rows[0].name,
email : user.rows[0].email,
role : user.rows[0].role
}
const secret = process.env.SECRET


// if(!secret) {
//   throw new Error("JWT secret not defined in environment variables");
// }

const token = jwt.sign(jwtPayload, secret as string, {expiresIn : "7d"}) 
// delete user.rows[0].password

    return {token, user: user.rows[0]}



}


export const authService = {
    loginUserInitDB

}