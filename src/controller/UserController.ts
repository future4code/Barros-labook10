import { Request, Response } from "express";
import { UserInputDTO } from "../model/userDTO";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../error/CustomError";

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

            
         res.status(201).send({ message: "Usuário criado!" })           
      
         } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const queryResult = await userBusiness.getAllUsers()
            
         res.status(201).send(queryResult)           
      
         } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}