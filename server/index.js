const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

app.use(cors());

const port = 3030;

app.use(express.json());
app.use(require("./routes/index"));

mongoose
  .connect(
    "mongodb+srv://Amir:intocode@cluster0.gzzxb.mongodb.net/ToDoList?retryWrites=true&w=majority"
  )
  .then(() => console.log("Соединение прошло успешно"))
  .catch((e) => console.log(e.message));

app.listen(port, () => console.log("Server is working"));
