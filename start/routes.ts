import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {
  Route.get('/tasks', 'TasksController.index')
  Route.post('/tasks', 'TasksController.store')
  Route.get('/tasks/:id', 'TasksController.show')
  Route.patch('/tasks/:id', 'TasksController.update')
  Route.delete('/tasks/:id', 'TasksController.destroy')
})
