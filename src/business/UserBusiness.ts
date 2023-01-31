import { UserDataBase } from "../data/UserDataBase"
import { user } from "../model/user"
import { UserInputDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"

export class UserBusiness{
    
    public create = async(input: UserInputDTO) => {
        let message = "Success!"
      const { name, email, password } = input

      if (!name || !email || !password) {
         message = '"name", "email" and "password" must be provided'
         throw new Error(message)
      }

      const id: string = generateId()

      const user: user = {
        id,
        name,
        email,
        password
      }

      const userDataBase = new UserDataBase()
      await userDataBase.create(user)

    }
    
}