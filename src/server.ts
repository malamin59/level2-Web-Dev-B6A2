import express, { Request , Response} from "express";

import { userRoute } from "./modules/user/user.route";
import { initDB } from "./database/db";
import { authRoute } from "./modules/auth/auth.route";

const app = express();
const port = 5000
// USER parser 
app.use(express.json())


// call the initDB
initDB()


/* Create a post route  */
app.use('/api/v1/users', userRoute)

// AUTH ROUTE
app.use('/api/v1/auth', authRoute)


app.get('/' , (req : Request, res : Response) =>{
res.status(200).json({
    message: "this is the root route",
    path : req.path
})
})



app.listen(port , () =>{
console.log(`express server running port on ${port}`)
})