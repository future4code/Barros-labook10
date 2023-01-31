import { PostDataBase } from "../data/PostDataBase"
import { InsertPostDTO, PostInputDTO } from "../model/postDTO"
import { generateId } from "../services/idGenerator"

const postDataBase = new PostDataBase()

export class PostBusiness {
    public create = async (input: PostInputDTO) => {
     
      const { photo, description, type, authorId } = input

      const id: string = generateId()

      const post: InsertPostDTO = {
        id,
        photo,
        description,
        type,        
        authorId
      }

      await postDataBase.create(post)
    }

    public getByid = async (id:string) => {
     
      const queryResult = await postDataBase.getById(id)
      return queryResult

    }
}