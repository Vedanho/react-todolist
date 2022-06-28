const express = require("express");

const cors = require("cors")

const mongoose = require("mongoose");

const app = express();

app.use(cors())

const port = 1000;

app.use(express.json());
app.use(require("./routes/toDo.routes"))


mongoose
  .connect(
    "mongodb+srv://Amir:intocode@cluster0.gzzxb.mongodb.net/ToDoList?retryWrites=true&w=majority"
  )
  .then(() => console.log("Соединение прошло успешно"))
  .catch(() => console.log("Произошла ощибка"));

app.listen(port, () => console.log("Server is working"));
