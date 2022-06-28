const ToDo = require("../models/Todo.model");

module.exports.todoControllers = {
  getToDo: async (req, res) => {
    try {
     const data = await ToDo.find();
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },
  addToDo: async (req, res) => {
    try {
      const toDo = await ToDo.create({
        text: req.body.text,
      });
      res.json(toDo);
    } catch (error) {
      res.json(error.message);
    }
  },
  changeToDo: async (req, res) => {
    try {
      const newTodo = await ToDo.findByIdAndUpdate(req.params.id, {
        completed: req.body.completed
      },) ;
      const changedTodo = await ToDo.findById(req.params.id)
     res.json(changedTodo);
    } catch (error) {
      res.json(error.message);
    }
  }, 
  deleteToDo: async (req, res) => {
    try {
        await ToDo.findByIdAndRemove(req.params.id) 
        res.json("Тудушка удалена")
    } catch (error) {
        res.json(error.message)
    }
  }
};
