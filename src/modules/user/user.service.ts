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
    `SELECT name, email , created_at FROM users where email =$1`,
    [email],
  );
  return result;
};



export const getUserById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at 
     FROM users 
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at 
     FROM users 
     WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}


export const getSingleUserById = async (id: string) => {
  const result = await pool.query(
    "SELECT id, name, email, role FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// export here
export const userServices = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  getSingleUserById
};
