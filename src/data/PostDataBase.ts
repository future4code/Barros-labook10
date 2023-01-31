import { BaseDatabase } from "./BaseDataBase";
import { UserDataBase } from "./UserDataBase";
import { InsertPostDTO } from "../model/postDTO";

export class PostDataBase extends BaseDatabase{
    private userTable = 'labook_posts'

    public create = async(post: InsertPostDTO) => {
        try {
            UserDataBase.connection.initialize();
            await UserDataBase.connection(this.userTable)
            .insert({
                id: post.id,
                photo: post.photo,
                description: post.description,
                type: post.type,
                author_id: post.authorId
            })
        }catch(error:any){
            throw new Error(error.message);
        }finally{
            console.log("conexão encerrada!");
            UserDataBase.connection.destroy();
         }
    }

    public getById = async (id:string) => {
        try {
            UserDataBase.connection.initialize();
           const queryResult:any = await UserDataBase.connection(this.userTable)
            .select("*")
            .where({ id })

            return queryResult
        }catch(error:any){
            throw new Error(error.message);
        }finally{
            console.log("conexão encerrada!");
            UserDataBase.connection.destroy();
         }
    }
}