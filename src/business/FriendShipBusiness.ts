import { FriendshipDataBase } from "../data/FriendShipDataBase"
import { UserDataBase } from "../data/UserDataBase"
import { CustomError } from "../error/CustomError"
import { DuplicatedId, ExistingFriendship, FriendsIdError, NoExistingFriendship } from "../error/FriendShipErrors"
import { UserIdNotFound } from "../error/UserErrors"
import { friends} from "../model/user"
import { FriendsInputDTO, UserInputDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"

const friendShipDataBase = new FriendshipDataBase()
const userDataBase = new UserDataBase()


export class FriendShipBusiness{
  
   public addFriend = async(input: FriendsInputDTO): Promise<void> => {
       try{ 
      const { user1, user2} = input

      if (!user1 || !user2) {
         throw new FriendsIdError()
      }

      if(user1 === user2) {
        throw new DuplicatedId()
      }

      const allUsers = await userDataBase.getAllUsers()

      const checkUser1 = allUsers.find(user => user.id === user1)

      if(!checkUser1){
        throw new UserIdNotFound()
      }

        console.log(checkUser1);
              

      const checkUser2 = allUsers.find(user => user.id === user2)
      
      if(!checkUser2){
        throw new UserIdNotFound()
      }  

     
      const allFriendsShips = await friendShipDataBase.getAllfriends()



      allFriendsShips.forEach((friendShip) => {
        if (friendShip.user_1_id === checkUser1.id || friendShip.user_1_id === checkUser2.id){
          allFriendsShips.forEach((friendShip) => {
            if (friendShip.user_2_id === checkUser1.id || friendShip.user_2_id === checkUser2.id){
              throw new ExistingFriendship()
            }
          })
        }
      })     
      

      const id: string = generateId()

      const friends: friends = {
        id,
        user1,
        user2
      }

      
      await friendShipDataBase.addFriend(friends)

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message)
  }
    }

    public deleteFriend = async (input:FriendsInputDTO): Promise<void> => {
      try{

        const {user1,user2} = input

        if (!user1 || !user2) {
          throw new FriendsIdError()
       }
 
       if(user1 === user2) {
         throw new DuplicatedId()
       }

       const allUsers = await userDataBase.getAllUsers()

      const checkUser1 = allUsers.find(user => user.id === user1)

      if(!checkUser1){
        throw new UserIdNotFound()
      }

        console.log(checkUser1);
              

      const checkUser2 = allUsers.find(user => user.id === user2)
      
      if(!checkUser2){
        throw new UserIdNotFound()
      }

      const allFriendsShips = await friendShipDataBase.getAllfriends()

      const getFriendships = allFriendsShips.find(friendship => friendship.user_1_id === checkUser1.id && friendship.user_2_id === checkUser2.id 
        || friendship.user_2_id === checkUser1.id && friendship.user_1_id === checkUser2.id)

        if (!getFriendships) {
          throw new NoExistingFriendship()
      }

      const id = getFriendships.id

      console.log(id);
      
        await friendShipDataBase.deleteFriend(id)
      } catch (error:any) {
      throw new CustomError(error.statusCode, error.message)
  }    
      
    }

    public getAllFriends = async (): Promise<friends[]> => {     
      try{
        const queryResult = await friendShipDataBase.getAllfriends()
      return queryResult
      }catch (error:any) {
        throw new CustomError(error.statusCode, error.message)
    }
    }
    
}