import { pool } from "../../database/db"
import bcrypt from "bcryptjs";
const createUserIntoDB = async(payload: Record<string, unknown>) =>{
 const {name, email, password, role} = payload
 const hashPassword = await bcrypt.hash(password as string, 12)
    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING  id , name, email ,age, created_at, updated_at, role ` , [name, email, hashPassword, role]) 
        // delete result.rows[0].password
        return result
}


const getAllUserIntoDB = async() =>{
    const result = await pool.query(`SELECT name, email ,age, created_at, updated_at FROM users`) 
        return result
}


const getSingleUserIntoDB = async(email: string) =>{
    const result = await pool.query(`SELECT name, email ,age, created_at, updated_at FROM  where email =$1`, [email]) 
        return result
}


// export here
export const userServices = {
    createUserIntoDB,
    getAllUserIntoDB, 
    getSingleUserIntoDB
}