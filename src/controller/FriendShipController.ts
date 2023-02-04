import { Request, Response } from "express";
import { FriendsInputDTO} from "../model/userDTO";
import { FriendShipBusiness } from "../business/FriendShipBusiness";

const friendShipBusiness = new FriendShipBusiness()

export class FriendShipController{
    public addFriend = async (req: Request, res: Response) => {
        try {
            const input: FriendsInputDTO = {
            user1: req.body.user1,
            user2: req.body.user2            
            }

            
            await friendShipBusiness.addFriend(input)

            
         res.status(201).send({ message: "Amizade Criada!" })           
      
         } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
         }
    }

    public deleteFriend = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
    
            await friendShipBusiness.deleteFriend(id)
    
            let message = "Amizade desfeita! :("  
    
          res.status(200).send({ message })           
    
       } catch (error:any) {
          let message = error.sqlMessage || error.message
          res.statusCode = 400
          res.send({ message })
       }  
    
        }
}