const UserRepositoryInMemory = require("../repositories/userRepository/userRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserListService = require("../services/UserServices/UserListService")

describe("UserCreateService", () => {
    let userRepository = null 
    let userCreateService = null 
    let userListService = null

    it("should be possible list users", async () => {
        const user1 = {
            name: "user test 1",
            email: "user1@test.com",
            password:"123"
        }
        const user2 = {
            name: "user test 2",
            email: "user2@test.com",
            password:"123"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userListService = new UserListService(userRepository)

        await userCreateService.execute(user1)
        await userCreateService.execute(user2)
        
        const listUsers = await userListService.execute()


        expect(listUsers).toEqual(expect.arrayContaining(listUsers))
    })

})