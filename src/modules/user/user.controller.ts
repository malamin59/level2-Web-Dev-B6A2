import { Request, Response } from "express";
import { getUserByEmail, getUserById, userServices } from "./user.service";
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUserIntoDB(req.body);
    return res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserIntoDB();
    return res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const email = req.user!.email;
    const result = await userServices.getSingleUserIntoDB(email);
    return res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const user = req.user;

    if (user.role !== "admin" && user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this user",
      });
    }
    if (user.role !== "admin" && payload.role) {
      return res.status(403).json({
        success: false,
        message: "You cannot change role",
      });
    }

    const updatedUser = await userServices.updateUserIntoDB(
      userId as string,
      payload,
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  getSingleUserById,
  updateUser,
};
