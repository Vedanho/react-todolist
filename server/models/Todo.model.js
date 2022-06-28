const { default: mongoose } = require("mongoose");


const ToDoSchema = mongoose.Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const ToDo = mongoose.model("ToDo", ToDoSchema)

module.exports = ToDo