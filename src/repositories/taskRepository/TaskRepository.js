const knex = require("../database/knex")

class TaskController {

    async createTask({title, description, user_id }) {
        const isComplete = false
        const taskId = await knex ("tasks").insert({title, description, isComplete, user_id })
        return {id: taskId } 
    }

    async listTask() { 
        const tasks = await knex("tasks")
        return tasks
    }

    async listTaskById(req, res) {
        const {id} = req.params

        const [task] = await knex("tasks").where({id})
            
        return res.status(200).json(task)
    }

    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body

        await knex("tasks").where({id}).update({title, description})

        return res.status(200).json("Registro atualizado com sucesso!")
    }
    
    async updateTaskStatus(req, res) {
        const {id} = req.params
        
        await knex("tasks").where({id}).update({isComplete: true})


        return res.status(200).json("Status atualizado com sucesso!!")
    }

    async deleteTask(req, res) {
        const {id} = req.params
        await knex("tasks").where({id}).delete({id})
        return res.status(200).json("Registro deletado com sucesso")
}

}

module.exports = TaskController