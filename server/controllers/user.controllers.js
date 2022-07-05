const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userControllers = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },
  addUser: async (req, res) => {
    try {
      const { login, password } = req.body;

      const hash = await bcrypt.hash(password,Number(process.env.BCRYPT_ROUNDS)); //Хэшируем пароль

      const newUser = await User.create({
        login: login,
        password: hash,
      });

      res.json(newUser);
      
    } catch (error) {
      return res.status(401).json({
        error: "Такой пользователь уже зарегистрирован" 
      });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login: login }); //проверка логина

      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин" }); //проверка логина
      }

      const valid = await bcrypt.compare(password, candidate.password); //Хэширование ВВЕДЕНОГО пароля и его сверка с паролем в базе

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" }); //проверка пароля
      }

      const payload = {
        //Данные для дальнешей выдачи токена
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        //Выдача токена
        expiresIn: "24h", //срок действия токена
      });

      res.json({ token, userId: payload.id });
    } catch (error) {
      res.json(error.message);
    }
  },
};
