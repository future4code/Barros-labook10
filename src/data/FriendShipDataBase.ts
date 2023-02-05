import { CustomError } from "../error/CustomError";
import { friends } from "../model/user";
import { FriendsDTO, FriendsInputDTO } from "../model/userDTO";
import { BaseDatabase } from "./BaseDataBase";

export class FriendshipDataBase extends BaseDatabase{
    private userTable = 'labook_friends'

    public addFriend = async (friends: friends):Promise<void> => {
        try{
            await  FriendshipDataBase.connection(this.userTable)
            .insert({
                id: friends.id,
                user_1_id: friends.user1,
                user_2_id: friends.user2                
            })
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteFriend = async (id:string):Promise<void> => {
        try{
            await  FriendshipDataBase.connection(this.userTable)
            .where({id})
            .delete()
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllfriends = async () => {
        try{            
            const queryResult = await FriendshipDataBase.connection(this.userTable)
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)

        }
    }


}