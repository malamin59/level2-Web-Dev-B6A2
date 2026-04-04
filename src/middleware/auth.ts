import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }
      let token;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      } else {
        token = authHeader;
      }

      const secretToken = process.env.SECRET;

      if (!secretToken) {
        return res.status(500).json({ message: "Server error" });
      }

      const decoded = jwt.verify(token as string, secretToken) as JwtPayload;

      const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        decoded.email,
      ]);

      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  };
};

export default auth;
