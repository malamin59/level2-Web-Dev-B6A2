import { pool } from "../../database/db";
import bcrypt from "bcryptjs";
const createUserIntoDB = async (payload: Record<string, unknown>) => {
  const { name, email, password, role, phone } = payload;
  const hashPassword = await bcrypt.hash(password as string, 12);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3, $4, $5) RETURNING  id , name, email , created_at,  role `,
    [name, email, hashPassword, phone, role],
  );
  // delete result.rows[0].password
  return result;
};

const getAllUserIntoDB = async () => {
  const result = await pool.query(`SELECT name, email ,created_at FROM users`);
  return result;
};

const getSingleUserIntoDB = async (email: string) => {
  const result = await pool.query(
    `SELECT name, email , created_at FROM  where email =$1`,
    [email],
  );
  return result;
};

// export here
export const userServices = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
};
