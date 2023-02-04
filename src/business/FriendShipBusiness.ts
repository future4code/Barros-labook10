import { FriendshipDataBase } from "../data/FriendShipDataBase"
import { friends} from "../model/user"
import { FriendsInputDTO, UserInputDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"

const friendShipDataBase = new FriendshipDataBase()

export class FriendShipBusiness{
  
   public addFriend = async(input: FriendsInputDTO) => {
        let message = "Success!"
      const { user1, user2} = input

      if (!user1 || !user2) {
         message = '"name", "email" and "password" must be provided'
         throw new Error(message)
      }

      const id: string = generateId()

      const friends: friends = {
        id,
        user1,
        user2
      }

      
      await friendShipDataBase.addFriend(friends)

    }

    public deleteFriend = async (id:string) => {     
      await friendShipDataBase.deleteFriend(id)
    }
    
}