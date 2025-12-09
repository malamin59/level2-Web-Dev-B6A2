import { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async (req : Request,res : Response ) =>{ 
   try {
    const result = await authService.loginUserInitDB(req.body.email, req.body.password) 
          return  res.status(201).json({
           success: true,  
           message : "user created",
           data: result
          }
        )
        
     } catch (error : any) {
     res.status(500).json({
       success: false ,
       message: error.message
     })
     }
}


export const authController = {
    loginUser
}