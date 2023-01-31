import { Request, Response } from "express";
import { UserInputDTO } from "../model/userDTO";
import { UserBusiness } from "../business/UserBusiness";

export class UserController{
    public create = async (req: Request, res: Response) => {
        try {
            const input: UserInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            }

            const userBusiness = new UserBusiness();
            await userBusiness.create(input)

            
         res.status(201).send({ message: "Usuário criado!" })           
      
         } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
         }
    }
}