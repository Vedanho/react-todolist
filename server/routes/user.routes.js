const { Router } = require("express");
const { userControllers } = require("../controllers/user.controllers");

const router = Router();

router.get("/users", userControllers.getUsers);
router.post("/users", userControllers.addUser);
router.post("/login", userControllers.login)

module.exports = router;
