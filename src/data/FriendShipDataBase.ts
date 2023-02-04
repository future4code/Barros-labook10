import { friends } from "../model/user";
import { BaseDatabase } from "./BaseDataBase";

export class FriendshipDataBase extends BaseDatabase{
    private userTable = 'labook_friends'

    public addFriend = async (friends: friends) => {
        try{
            FriendshipDataBase.connection.initialize()
            await  FriendshipDataBase.connection(this.userTable)
            .insert({
                id: friends.id,
                user_1_id: friends.user1,
                user_2_id: friends.user2                
            })
        }catch(error:any){
            throw new Error(error.message);
        }finally{
            console.log("conexão encerrada!");
            FriendshipDataBase.connection.destroy();
         }
    }

    public deleteFriend = async (id:string) => {
        try{
            FriendshipDataBase.connection.initialize()
            await  FriendshipDataBase.connection(this.userTable)
            .where({id})
            .delete()
        }catch(error:any){
            throw new Error(error.message);
        }finally{
            console.log("conexão encerrada!");
            FriendshipDataBase.connection.destroy();
         }
    }


}