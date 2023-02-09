import { BaseDatabase } from "./BaseDataBase";
import {user} from '../model/user'
import { CustomError } from "../error/CustomError";

export class UserDataBase extends BaseDatabase{
    private userTable = 'labook_users'

    public create = async (user: user) => {
        try{
            
            await UserDataBase.connection(this.userTable)
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            })
        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }

    public getAllUsers = async () => {
        try{
            const queryResult = await UserDataBase.connection(this.userTable)    
            return queryResult        
        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }  

}