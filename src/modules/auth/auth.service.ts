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
email : user.rows[0].email
}
const secret = "781c3b182eb28801d5dc95fa3065e26a08e8e1d5ee1249c83750879f72d897c3832b2abd701162f0ab141afe4c36d1944fcf208b4fecd3b42e22d4a8253362ee"
const token = jwt.sign(jwtPayload, secret, {expiresIn : "7d"})
// delete user.rows[0].password

    return {token, user: user.rows[0]}



}


export const authService = {
    loginUserInitDB

}