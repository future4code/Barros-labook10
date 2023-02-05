import { UserDataBase } from "../data/UserDataBase"
import { CustomError } from "../error/CustomError"
import { MissingData } from "../error/UserErrors"
import { user } from "../model/user"
import { UserInputDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"

const userDataBase = new UserDataBase()

export class UserBusiness{
    
    public create = async(input: UserInputDTO):Promise<void> => {
       try{
        const { name, email, password } = input

      if (!name || !email || !password) {
         throw new MissingData
      }

      const id: string = generateId()

      const user: user = {
        id,
        name,
        email,
        password
      }

      
      await userDataBase.create(user)
       }catch (error:any) {
        throw new CustomError(error.statusCode, error.message)
    }     

    }

    public getAllUsers = async():Promise<user[]> =>{
      try{
        const queryResult = await userDataBase.getAllUsers()
      return queryResult
      }catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
      
    }
    
}