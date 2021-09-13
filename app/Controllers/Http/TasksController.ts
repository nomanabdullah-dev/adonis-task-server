import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index ({response}: HttpContextContract) {
    try {
      const tasks = await Task.query().paginate(1, 10)
      return response.status(200).json({
        message: ['Successfully fetched your latest tasks.'],
        data: tasks
      })
    } catch (error) {
      return response.status(200).json({
        message: ['Network Error'],
        data: {}
      })
    }
  }

  public async store ({request, response}: HttpContextContract) {
    const validations = schema.create({
      title: schema.string(),
      task: schema.string()
    })
    const data = await request.validate({schema:validations})

    try {
      const newTask = await Task.create({title:data.title, task:data.task})
      return response.status(201).json({
        message: ['Successfully created task'],
        data: newTask
      })
    } catch (error) {
      return response.status(422).json({
        message: ['Something goes wrong!'],
        data: {}
      })
    }
  }

  public async show ({params, response}: HttpContextContract) {
    try {
      const task = await Task.findOrFail(params.id)
      return response.status(200).json({
        message:['Successfully fetched task'],
        data: task
      })
    } catch (error) {
      return response.status(404).json({message:['Task does not exist']})
    }
  }

  public async update ({request, response, params}: HttpContextContract) {
    try {
      const dbTask = await Task.findOrFail(params.id)
      const taskData = request.post()
      dbTask.completed = taskData.status
      await dbTask.save()
      return response.status(201).json({
        message: ['Successfully updated task'],
        data: dbTask
      })
    } catch (error) {
      return response.status(201).json({
        message: ['Please check your details and try again!'],
        data: {}
      })
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.delete()
      return response.status(200).json({ message:['Successfully deleted task'] })
    } catch (error) {
      return response.status(404).json({message:['Task does not exist']})
    }
  }
}
