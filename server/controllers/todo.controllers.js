const ToDo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todoControllers = {
  getToDo: async (req, res) => {
    try {
      const todos = await ToDo.find({user: req.params.id});
      res.json(todos);
    } catch (error) {
      res.json(error.message);
    }
  },
  addToDo: async (req, res) => {
    const { userId, text } = req.body;

    try {
      const toDo = await ToDo.create({
        user: req.user.id,
        text,
      });

      return res.json(toDo);
      
    } catch (e) {
      return res.status(401).json(e.message);
    }
  },
  changeToDo: async (req, res) => {
    try {
      const newTodo = await ToDo.findByIdAndUpdate(req.params.id, {
        completed: req.body.completed,
      });
      const changedTodo = await ToDo.findById(req.params.id);
      res.json(changedTodo);
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteToDo: async (req, res) => {
    const { id } = req.params;
   
    try {
      const toDo = await ToDo.findById(id);

      if (toDo.user.toString() === req.user.id) {
        await toDo.remove();

        return res.json("Удалено");
      }

      return res.status(401).json("Ошибка, нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка" + e.message);
    }
  },
};
