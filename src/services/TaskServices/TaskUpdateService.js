

class TaskUpdateService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute({title, description, id}) {
        const taskCreated = await this.taskRepository.createTask({title, description, id})
        return taskCreated
    }
}

module.exports = TaskUpdateService