import { Request, Response } from "express";
import { getUserByEmail, getUserById, userServices } from "./user.service";
const createUser = async (req: Request, res : Response) =>{
  try {
     const result = await userServices.createUserIntoDB(req.body)
   return  res.status(201).json({
        success: true,  
        message : "user created",
        data : result.rows[0]
    })
  } catch (error : any) {
  res.status(500).json({
    success: false ,
    message: error.message
  })
  }
    
}


const getAllUser = async (req: Request, res : Response) =>{
  try {
     const result = await userServices.getAllUserIntoDB()
   return  res.status(201).json({
        success: true,  
        message : "user created",
        data : result.rows,
    })
  } catch (error : any) {
  res.status(500).json({
    success: false ,
    message: error.message
  })
  }
    
}




const getSingleUser = async (req: Request, res : Response) =>{
  try {
    const email =  req.user!.email
     const result = await userServices.getSingleUserIntoDB(email)
   return  res.status(201).json({
        success: true,  
        message : "user created",
        data : result.rows,
    })
  } catch (error : any) {
  res.status(500).json({
    success: false ,
    message: error.message
  })
  }
    
}


export const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userServices.getSingleUserById(id as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    getSingleUserById
}