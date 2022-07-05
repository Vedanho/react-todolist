const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");
    
    //Проверка токена

    if (!authorization) {
        return res.status(401).json("Нет доступа(no authorization header)")
    }
    
    if (type !== "Bearer") {
      return res.status(400).json("Неверный тип токена");
    }
    console.log(token)
    try {
      req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY); //Дешифровка токена и его сравнение
      
      next()
    } catch (e) {
      return res.status(401).json({error: e.toString()});
    }
};
