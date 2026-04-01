import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehiclesIntoDb(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicles Created",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL VEHICLES IN DB */
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehiclesIntoDb();
    return res.status(201).json({
      success: true,
      message: "Vehicles Created",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET specific VEHICLES BY ID IN DB */
const getSpecificVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await vehiclesServices.getSpecificVehicleById(
      vehicleId as string,
    );
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "vehicles not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update vehicles details
const updateVehicles = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const payload = req.body;
    const updatedVehicle = await vehiclesServices.updateVehicleIntoDB(
      vehicleId as string,
      payload,
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getSpecificVehicle,
  updateVehicles,
};
