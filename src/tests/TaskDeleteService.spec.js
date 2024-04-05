const TaskRepositoryInMemory = require("../repositories/taskRepository/taskRepositoryInMemory")
const UserRepositoryInMemory = require("../repositories/userRepository/userRepositoryInMemory")

const TaskCreateService = require("../services/TaskServices/TaskCreateService");
const UserCreateService = require("../services/UserServices/UserCreateService");
const TaskDeleteService = require("../services/TaskServices/TaskDeleteService");
const TaskListService = require("../services/TaskServices/TaskListService")


describe("TaskCreateService", () => {
    let taskRepository = null
    let userRepository = null
    let taskCreateService = null
    let userCreateService = null
    let taskDeleteService = null
    let taskListService = null

    beforeEach(() => {
        
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository);
        taskRepository = new TaskRepositoryInMemory()
        taskCreateService = new TaskCreateService(taskRepository);
        taskDeleteService = new TaskDeleteService(taskRepository);
        taskListService = new TaskListService(taskRepository)

    })
 
    it("should be able to delete a task", async () => {
        const user = {
            name: "user test",
            email: "user@test.com",
            password:"123"
        }
        const userCreated = await userCreateService.execute(user)
       

        const task = {
            
            title: "testando api com jest",
            description: "Elaborar testes unitários na aplicação",
            user_id: userCreated.user_id
        }
        await taskCreateService.execute(task)

        await taskDeleteService.execute(task)

        const list = await taskListService.execute()



        expect(list).not.toHaveProperty("title", "Testando api com jest",)
        
    })
})

