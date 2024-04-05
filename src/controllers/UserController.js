const knex = require("../database/knex")

const UserRepository = require("../repositories/userRepository/userRepository")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserListByIdService = require("../services/UserServices/UserListByIdService")
const UserListService = require("../services/UserServices/UserListService")
const UserUpdateService = require("../services/UserServices/UserUpdateService")


const userRepository = new UserRepository()
const userCreateService = new UserCreateService(userRepository)
const userListService = new UserListService(userRepository)
const userListByIdService = new UserListByIdService(userRepository)
const userUpdateService = new UserUpdateService(userRepository)

class UserController {

    async createUser(req, res) {
        const {name, email, password} = req.body

        await userCreateService.execute({name, email, password})

        return res.status(201).json("Usuário cadastrado com sucesso!")
    }

    async listUser(req, res) { 
        
        const users = await userListService.execute()

        return res.status(200).json(users)
    }


 async listUserById(req, res) {

       const {user_id} = req.params

       const user = await userListByIdService.execute({user_id})

       return res.status(200).json(user)
    }

    async updateUser(req, res) {
        const {user_id} = req.params
        const {name, email} = req.body

        await userUpdateService.execute({user_id, name, email})

        return res.status(200).json("Usuário atualizado com sucesso!")
    }
   
    async updateUserStatus(req, res) {
        const {user_id} = req.params
        const {name, email} = req.body

        await knex("users").where({id: user_id}).update({isAdmin: true})

        return res.status(200).json("Usuário agora é um administrador!")
    }

    async deleteUser(req, res) {
        const {user_id} = req.params
        await knex("users").where({id: user_id}).delete()
    return res.status(200).json("Registro deletado com sucesso")
}

} 

module.exports = UserController