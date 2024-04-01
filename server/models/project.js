const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {taskSchema} = require("./task"); 

const projectSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
