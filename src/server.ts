import express, { Request , Response} from "express";
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./database/db";
import { authRoute } from "./modules/auth/auth.route";
import dotenv from "dotenv"
import { VehiclesRoute } from "./modules/Vehicles/vehicles.route";
import { bookingRoutes } from "./modules/Bookings/booking.route";
dotenv.config()
const app = express();
const port = 5000
// USER parser 
app.use(express.json())
// call the initDB
initDB()

// AUTH ROUTE
app.use('/api/v1/auth',  authRoute)
/* Create a post route  */
app.use('/api/v1/users' , userRoute)


// VEHICLES ROUTE
app.use('/api/v1/vehicles', VehiclesRoute )
app.use('/api/v1/bookings', bookingRoutes )


app.get('/' , (req : Request, res : Response) =>{
res.status(200).json({
    message: "this is the root route",
    path : req.path
})
})

app.listen(port , () =>{
console.log(`express server running port on ${port}`)
})