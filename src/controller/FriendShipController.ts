import { Request, Response } from "express";
import { FriendsInputDTO} from "../model/userDTO";
import { FriendShipBusiness } from "../business/FriendShipBusiness";
import { CustomError } from "../error/CustomError";

const friendShipBusiness = new FriendShipBusiness()

export class FriendShipController{
    public addFriend = async (req: Request, res: Response):Promise<void> => {
        try {
            const input: FriendsInputDTO = {
            user1: req.body.user1,
            user2: req.body.user2            
            }

            
            await friendShipBusiness.addFriend(input)

            
         res.status(201).send({ message: "Amizade Criada!" })           
      
         } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteFriend = async (req: Request, res: Response):Promise<void> => {
        try {
         const input: FriendsInputDTO = {
            user1: req.params.user1 as string,
            user2: req.body.user2 as string           
            }
    
            await friendShipBusiness.deleteFriend(input)
    
            let message = "Amizade desfeita! :("  
    
          res.status(200).send({ message })           
    
       } catch (error:any) {
         throw new CustomError(error.statusCode, error.message)
     } 
    
        }

        public getAllFriends = async (req: Request, res: Response):Promise<void> => {
         try {
         const queryResult = await friendShipBusiness.getAllFriends()
     
                
           res.status(200).send(queryResult)           
     
        } catch (error:any) {
         throw new CustomError(error.statusCode, error.message)
     }  
     
         }


        
}