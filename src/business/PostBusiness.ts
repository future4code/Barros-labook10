import { PostDataBase } from "../data/PostDataBase"
import { UserDataBase } from "../data/UserDataBase"
import { CustomError } from "../error/CustomError"
import { IdNotFound, MissingData, WrongType } from "../error/PostErrors"
import { UserIdNotFound } from "../error/UserErrors"
import { InsertPostDTO, JoinPostDTO, PostInputDTO } from "../model/postDTO"
import { generateId } from "../services/idGenerator"

const postDataBase = new PostDataBase()
const userDataBase = new UserDataBase()

export class PostBusiness {
    public create = async (input: PostInputDTO): Promise<void> => {
     try{
      const { photo, description, type, authorId } = input

      if(!photo || !description || !type || !authorId){
        throw new MissingData()
      }

      if (type !== 'normal' && type !== 'event') {
        throw new WrongType()
    }

      const id: string = generateId()

      const post: InsertPostDTO = {
        id,
        photo,
        description,
        type,        
        authorId
      }

      await postDataBase.create(post)
    }catch (error:any) {
      throw new CustomError(400, error.message);
  }
    }

    public getByid = async (id:string) => {
      try{
      
        if(!id){
                  throw new IdNotFound()
               }
           
      const queryResult = await postDataBase.getById(id)
      return queryResult
      
    }catch (error:any) {
      throw new CustomError(400, error.message);
  }

    }

    public friendsFeed = async (id:string):Promise<JoinPostDTO[]> => {
      try{
      if(!id){
        throw new IdNotFound()
      }

      const allUsers = await userDataBase.getAllUsers()

      const checkUser = allUsers.find(user => user.id === id)

      if(!checkUser){
        throw new UserIdNotFound()
      }
     
      const queryResult = await postDataBase.friendsFeed(id)
      return queryResult
    }catch (error:any) {
      throw new CustomError(400, error.message);
  }

    }


}