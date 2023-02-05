import { Request, Response } from "express";
import { UserInputDTO } from "../model/userDTO";
import { UserBusiness } from "../business/UserBusiness";


const userBusiness = new UserBusiness();

export class UserController{
    public create = async (req: Request, res: Response) => {
        try {
            const input: UserInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            }

            
            await userBusiness.create(input)

            
         res.status(201).send({ message: "user created!" })           
      
         } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const queryResult = await userBusiness.getAllUsers()
            
         res.status(201).send(queryResult)           
      
         } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}