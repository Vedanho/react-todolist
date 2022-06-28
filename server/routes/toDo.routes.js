const { Router } = require("express")
const { todoControllers } = require("../controllers/todo.controllers")

const router = Router()

router.post('/toDo', todoControllers.addToDo)
router.patch('/toDo/:id', todoControllers.changeToDo)
router.delete('/toDo/:id', todoControllers.deleteToDo)
router.get('/toDo', todoControllers.getToDo)

module.exports = router