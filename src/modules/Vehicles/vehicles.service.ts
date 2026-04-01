import { pool } from "../../database/db";

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
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result.rows[0];
};

// get all vehicles
const getAllVehiclesIntoDb = async () => {
  const result = await pool.query(`
    SELECT id , vehicle_name, type, registration_number ,daily_rent_price , availability_status FROM vehicles
      `);
  return result;
};

export const getSpecificVehicleById = async (id: string) => {
  const result = await pool.query(
    ` SELECT id , vehicle_name, type, registration_number ,daily_rent_price , availability_status FROM vehicles
     WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

const updateVehicleIntoDB = async (vehicleId: string, payload: any) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in payload) {
    fields.push(`${key} = $${index}`);
    values.push(payload[key]);
    index++;
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  const query = `
    UPDATE vehicles
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *;
  `;

  values.push(vehicleId);

  const result = await pool.query(query, values);

  return result.rows[0];
};

// delete vehicles
const deleteVehicleFromDB = async (vehicleId: string) => {
 const bookingCheckQuery = `
  SELECT * FROM bookings
  WHERE vehicle_id = $1;
`;
  const bookingResult = await pool.query(bookingCheckQuery, [vehicleId]);
  if (bookingResult.rows.length > 0) {
  }
  const deleteQuery = `
    DELETE FROM vehicles
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(deleteQuery, [vehicleId]);
  return result.rows[0];
};

export const vehiclesServices = {
  createVehiclesIntoDb,
  getAllVehiclesIntoDb,
  getSpecificVehicleById,
  updateVehicleIntoDB,
  deleteVehicleFromDB,
};
