require("dotenv").config()

const express = require("express")
const app = express()
const cors = require('cors');
const mongoose = require("mongoose")
const {task} = require("./models/task")
const Project = require("./models/project")

app.use(cors({
    allowedHeaders: ['Content-Type']
}));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(5000)
        console.log("Server started on port 5000")
    })
    .catch((err) => console.log(err))

app.use(express.json())

app.get("/", (req, res) => {
    res.json({sample: "sample"})
})

app.get("/projects", async (req, res) => {
    const projects = await Project.find()
    return res.json({ projects })
})

app.get("/sample", (req, res) => {
    res.redirect("/")
})

app.post("/create/task", async (req, res) => {

    const {
        id,
        title,
        complete,
        description,
        date, 
        priority,
        projectId
    } = req.body;

    const projectObject = await Project.findOne({id : projectId})

    const taskObject = new task({
        id,
        title,
        complete,
        description,
        date, 
        priority,
    })

    projectObject.tasks.push(taskObject);
    console.log(taskObject)
    console.log(projectObject)

    await projectObject.save();

    res.json(taskObject)
})

app.post("/create/project", async (req, res) => {

    const {name, icon} = req.body;

    const projectObject = new Project({
        id: Date.now().toString(),
        name,
        icon,
        tasks: []
    })

    console.log("projectObject", projectObject)
    await projectObject.save()

    res.json(projectObject)
})

app.delete("/delete/project/:projectId/task/:taskId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;

        const updatedProject = await Project.findOneAndUpdate(
            { id: projectId }, 
            { $pull: { tasks: { id: taskId } } }, 
            { new: true } 
        );

        console.log(updatedProject)

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/delete/project/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const deletedProject = await Project.deleteOne({ id: projectId });

        if (deletedProject.deletedCount === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/edit/project/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const { name, icon } = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            { id: projectId },
            { name, icon },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/edit/project/:projectId/task/:taskId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const { title, description, complete, date, priority } = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            { id: projectId, "tasks.id": taskId },
            {
                $set: {
                    "tasks.$.title": title,
                    "tasks.$.description": description,
                    "tasks.$.complete": complete,
                    "tasks.$.date": date,
                    "tasks.$.priority": priority
                }
            },
            { new: true } 
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project or Task not found" });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/newone", (req, res) => {
    res.json({"users": ["four", "two", "three"]})
})

