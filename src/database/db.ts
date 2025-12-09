import {Pool} from 'pg'

export  const pool  = new Pool({
    connectionString : 'postgresql://neondb_owner:npg_vcBq1QUR6SLf@ep-broad-paper-a8cfc4ua-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
})

// create init here 
 export const initDB = async() =>{
    pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id  SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL, 
        email VARCHAR(150) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(100) NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
         
        `)

        console.log("database connected")
}

