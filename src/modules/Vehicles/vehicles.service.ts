import { pool } from "../../database/db"

const createVehiclesIntoDb = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO vehicles 
    (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );

  return result.rows[0];
};

// get all vehicles
const getAllVehiclesIntoDb = async() =>{
  const result = await pool.query(`
    SELECT id , vehicle_name, type, registration_number ,daily_rent_price , availability_status FROM vehicles
      `)
      return result
} 


export const getSpecificVehicleById = async (id: string) => {
  const result = await pool.query(
    ` SELECT id , vehicle_name, type, registration_number ,daily_rent_price , availability_status FROM vehicles
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};





export const vehiclesServices = {
    createVehiclesIntoDb, 
    getAllVehiclesIntoDb,
    getSpecificVehicleById
}