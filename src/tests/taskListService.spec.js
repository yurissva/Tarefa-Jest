const UserRepositoryInMemory = require("../repositories/userRepository/userRepositoryInMemory")
const TaskRepositoryInMemory = require("../repositories/taskRepository/taskRepositoryInMemory")

const UserCreateService = require("../services/UserServices/UserCreateService")

const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const TaskListService = require("../services/TaskServices/TaskListService")

describe("TaskListService", () => {
    let userRepository = null
    let taskRepository = null 
    let userCreateService = null
    let taskCreateService = null
    let taskListService = null

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)

        taskRepository = new TaskRepositoryInMemory()
        taskCreateService = new TaskCreateService(taskRepository)
        taskListService = new TaskListService(taskRepository)
    })

    it("should be able to list tasks", async () => {
        const user = {
            name: "user test",
            email: "user@test.com",
            password:"123"
        }
        const userCreated = await userCreateService.execute(user)
        
        const task1 = {
            
            title: "testando api com jest",
            description: "Elaborar testes unitários na aplicação",
            user_id: userCreated.user_id
        }
        const task2 = {
            
            title: "testando integração de api",
            description: "Elaborar testes de integração",
            user_id: userCreated.user_id
    }
        await taskCreateService.execute(task1)
        await taskCreateService.execute(task2)

        const list = await taskListService.execute()
        expect(list).toEqual(expect.arrayContaining(list))
    
    })
})