const { Router } = require("express");
const { todoControllers } = require("../controllers/todo.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/todo", authMiddleware, todoControllers.addToDo);
router.patch("/todo/:id", authMiddleware, todoControllers.changeToDo);
router.delete("/todo/:id", authMiddleware, todoControllers.deleteToDo);
router.get("/todo/:id", authMiddleware, todoControllers.getToDo);

module.exports = router;
