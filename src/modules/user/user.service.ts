import { pool } from "../../database/db"
import bcrypt from "bcryptjs";
const createUserIntoDB = async(payload: Record<string, unknown>) =>{
 const {name, email, password} = payload
 const hashPassword = await bcrypt.hash(password as string, 12)
    const result = await pool.query(`
        INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *` , [name, email, hashPassword]) 
        // delete result.rows[0].password
        return result
}


// export here
export const userServices = {
    createUserIntoDB,
}