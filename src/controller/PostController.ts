import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { post } from "../model/post";
import { PostInputDTO } from "../model/postDTO";


const postBusiness = new PostBusiness()


export class PostController {
    public create = async (req: Request, res: Response) => {
        try {
            const input: PostInputDTO = {
                photo: req.body.photo, 
                description: req.body.description, 
                type: req.body.type, 
                authorId: req.body.authorId
            }

            await postBusiness.create(input)

            res.status(201).send({ message: "post created successfully!" })

   } catch (error:any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
  }
    }

    public getById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const queryResult = await postBusiness.getByid(id)

        let message = "Sucess!"

        if (!queryResult[0]) {
         res.statusCode = 404
         message = "Post not found"
         throw new Error(message)
      }

      const post: post = {
         id: queryResult[0].id,
         photo: queryResult[0].photo,
         description: queryResult[0].description,
         type: queryResult[0].type,
         createdAt: queryResult[0].created_at,
         authorId: queryResult[0].author_id,
      }

      res.status(200).send({ message, post })           

   } catch (error:any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
  }


    }


    public friendsFeed = async (req: Request, res: Response) => {
      try {
          const id = req.params.id as string
  
          const queryResult = await postBusiness.friendsFeed(id)
         
        
        res.status(200).send(queryResult)           
  
     }catch (error:any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
  }
  
  
      }

    



}