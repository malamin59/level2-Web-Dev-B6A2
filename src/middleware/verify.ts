import { NextFunction, Request, Response  } from "express";

const verify = (req : Request, res: Response, next: NextFunction) =>{
const idCard = true 
if(!idCard) {
    throw new Error("sorry brow")
}
next()
}

export default verify