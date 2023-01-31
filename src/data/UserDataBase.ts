import { BaseDatabase } from "./BaseDataBase";
import {user} from '../model/user'

export class UserDataBase extends BaseDatabase{
    private userTable = 'labook_users'

    public create = async (user: user) => {
        try{
            UserDataBase.connection.initialize()
            await UserDataBase.connection(this.userTable)
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            })
        }catch(error:any){
            throw new Error(error.message);
        }finally{
            console.log("conexão encerrada!");
            UserDataBase.connection.destroy();
         }
    }
}