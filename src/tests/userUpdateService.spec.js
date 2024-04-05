const UserRepositoryInMemory = require("../repositories/userRepository/userRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserUpdateService = require("../services/UserServices/UserUpdateService")

describe("UserCreateService", () => {
    let userRepository = null 
    let userCreateService = null 
    let userUpdateService = null

    it("should be possible to update an user", async () => {
        const user = {
            name: "user test",
            email: "user@test.com",
            password:"123"
        }
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userUpdateService = new UserUpdateService(userRepository)

        const userCreated = await userCreateService.execute(user)

        userCreated.name = "User update",
        userCreated.email = "updated@mail.com"

        const updateUser = await userUpdateService.execute({userCreated})

        expect(updateUser).toHaveProperty("email", updateUser.email)
    
    })
})