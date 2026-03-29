import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

;

const createVehicles =  async(req : Request, res: Response) =>{

    try {
        const result = await vehiclesServices.createVehiclesIntoDb(req.body)
        return res.status(201).json({
            success: true, 
            message : "Vehicles Created"
        })
    } catch (error: any) {
        res.status(500).json({
            success :false, 
            message : error.message
        })
    }
}


export const vehiclesController = {
    createVehicles
}