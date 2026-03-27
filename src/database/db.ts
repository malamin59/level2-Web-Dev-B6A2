import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_vcBq1QUR6SLf@ep-broad-paper-a8cfc4ua-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});

// create init here
export const initDB = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF  NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password TEXT NOT NULL CHECK (length(password) >= 6),
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP DEFAULT NOW()
)   
`);
    /* VEHICLES TABLE  */
    await pool.query(`
     CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC CHECK (daily_rent_price > 0),
        availability_status VARCHAR(20) DEFAULT 'available'
      )
  `);
    // BOOKINGS TABLE
    await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id),
        vehicle_id INT REFERENCES vehicles(id),
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL
      )

  `);
  } catch (error) {
    console.error(" DB Init Error:", error);
  }
  console.log("database connected");
};
