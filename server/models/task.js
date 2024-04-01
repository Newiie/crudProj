const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String, 
        required: true,
    },
    priority: {
        type: String,
        required: true,
    }
});

const task = mongoose.model("Task", taskSchema);

module.exports = {task, taskSchema};
