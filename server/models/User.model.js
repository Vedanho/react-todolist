const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true, //Для оригинального логина каждого пользователя
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
