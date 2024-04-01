import { useState } from "react";
import { useApp } from "../hooks/TaskProvider"

const AddTask = () => {
    const { setAddTaskBtn, handleAddTask } = useApp();
    const [taskDescription, setTaskDescription] = useState("")
    const [priority, setPriority] = useState("Urgent and important.");
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")

    const handleTaskDescription = (e) => {
        setTaskDescription(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

  return (
    <div className="add-task-container modal" data-add-task-container>
            <div className="add-task-body modal-body">
                <div className="add-project-title">
                    <h2 className="modal-title" data-project-title>Add Task</h2>
                    <i className="fa-solid fa-xmark apbody-close-btn" onClick={() => setAddTaskBtn(false)} data-at-close-btn></i>
                </div>
                <div className="task-form" action="" data-task-form>
                    <label htmlFor="task-title">Title*</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="task-title" id="task-title" data-task-title/>
                    <label htmlFor="task-description">Description</label>
                    <textarea value={taskDescription} onChange={handleTaskDescription} name="task-description" id="task-description" data-task-description rows="4" cols="50"></textarea>
                    <label htmlFor="task-date">Due Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} name="task-date" id="task-date" data-task-date/>
                    <label htmlFor="task-priority">Priority</label>
                    <select value={priority} onChange={handlePriorityChange} name="priority" id="prioritySelect" data-task-priority>
                        <option disabled>Select Priority</option>
                        <option value="Urgent and important.">Urgent and important.</option>
                        <option value="Not urgent yet important.">Not urgent yet important.</option>
                        <option value="Urgent but not important.">Urgent but not important.</option>
                        <option value="Not urgent and not important.">Not urgent and not important.</option>
                    </select>
                    <hr/>
                    <div className="add-project-btns">
                        <button type="button" className="cancel-btn" onClick={() => setAddTaskBtn(false)} data-at-cancel-btn>Cancel</button>
                        <button onClick={() => handleAddTask(title, taskDescription, date, priority)} className="add-btn" data-add-task-btn>Add</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddTask
