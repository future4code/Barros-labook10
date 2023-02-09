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

            
         res.status(201).send({ message: "friendship created!" })           
      
         } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public deleteFriend = async (req: Request, res: Response) => {
        try {
         const input: FriendsInputDTO = {
            user1: req.params.user1 as string,
            user2: req.body.user2 as string           
            }
    
            await friendShipBusiness.deleteFriend(input)
    
            let message = "broken friendship! :("  
    
          res.status(200).send({ message })           
    
       } catch (error:any) {
        res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
     } 
    
        }

        public getAllFriends = async (req: Request, res: Response) => {
         try {
         const queryResult = await friendShipBusiness.getAllFriends()
     
                
           res.status(200).send(queryResult)           
     
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
     }  
     
         }


        
}