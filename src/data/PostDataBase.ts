import { BaseDatabase } from "./BaseDataBase";
import { InsertPostDTO, JoinPostDTO } from "../model/postDTO";
import { CustomError } from "../error/CustomError";
import { post } from "../model/post";

export class PostDataBase extends BaseDatabase{
    private userTable = 'labook_posts'

    public create = async(post: InsertPostDTO):Promise<void> => {
        try {
           await PostDataBase.connection(this.userTable)
            .insert({
                id: post.id,
                photo: post.photo,
                description: post.description,
                type: post.type,
                author_id: post.authorId
            })
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getById = async (id:string) => {
        try {
           const queryResult:any = await PostDataBase.connection(this.userTable)
            .select("*")
            .where({ id })

            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

    

    public friendsFeed = async (id:string):Promise<JoinPostDTO[]> => {
        try {
            const queryResult:any = await PostDataBase.connection("labook_posts")
           .select("labook_posts.photo", "labook_posts.description","labook_posts.type","labook_posts.created_at", "labook_users.name")
            .from("labook_posts")
            .join("labook_users", "labook_posts.author_id", "=", "labook_users.id")
            .join("labook_friends", function(){
                this.on("labook_posts.author_id", "=", "labook_friends.user_2_id")
                .orOn("labook_posts.author_id", "=", "labook_friends.user_1_id")
            })
            .where(function(){
                this.where("labook_friends.user_1_id", "=", id)
                .orWhere("labook_friends.user_2_id", "=",id)
            })
            .andWhere("labook_posts.author_id", "<>", id)
            .orderBy("labook_posts.created_at", "desc")            
     
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }
}