import { useEffect, useState } from "react";
import { useApp } from "../hooks/TaskProvider"

const EditTask = () => {
    const {task, setShowEditTask, handleEditTask } = useApp();
    const [priority, setPriority] = useState("");
    
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        setTempTask(prevTask => ({...prevTask, priority: e.target.value}))
    };

    const [tempTask, setTempTask] = useState(task)

    useEffect(() => {
        setPriority(tempTask.priority)
        console.log("TEMPTASK", tempTask)
    }, [])

  return (
    <div className="add-task-container modal" data-add-task-container>
            <div className="add-task-body modal-body">
                <div className="add-project-title">
                    <h2 className="modal-title" data-project-title>Edit Task</h2>
                    <i className="fa-solid fa-xmark apbody-close-btn" onClick={() => setShowEditTask(false)} data-at-close-btn></i>
                </div>
                <div className="task-form" action="" data-task-form>
                    <label htmlFor="task-title">Title*</label>
                    <input 
                        value={tempTask.title} 
                        onChange={(e) => setTempTask(prevTask => ({ ...prevTask, title: e.target.value }))} 
                        type="text" 
                        name="task-title" 
                        id="task-title" 
                        data-task-title
                    />
                    
                    <label htmlFor="task-description">Description</label>
                    <textarea value={tempTask.description} onChange={(e) => {
                        setTempTask(prevTask => ({ ...prevTask, description: e.target.value}))
                    }} name="task-description" id="task-description" data-task-description rows="4" cols="50"></textarea>


                    <label htmlFor="task-date">Due Date</label>
                    <input value={tempTask.date} onChange={(e) => {
                        setTempTask(prevTask => ({ ...prevTask, date: e.target.value}))
                    }} type="date" name="task-date" id="task-date" data-task-date/>
                    <label htmlFor="task-priority">Priority</label>
                    <select value={priority} onChange={(e) => handlePriorityChange(e)} name="priority" id="prioritySelect" data-task-priority>
                        <option disabled>Select Priority</option>
                        <option value="Urgent and important.">Urgent and important.</option>
                        <option value="Not urgent yet important.">Not urgent yet important.</option>
                        <option value="Urgent but not important.">Urgent but not important.</option>
                        <option value="Not urgent and not important.">Not urgent and not important.</option>
                    </select>
                    <hr/>
                    <div className="add-project-btns">
                        <button type="button" className="cancel-btn" onClick={() => setShowEditTask(false)} data-at-cancel-btn>Cancel</button>
                        <button className="add-btn" onClick={() => {
                            handleEditTask(tempTask)
                            setShowEditTask(false)
                            console.log("task", tempTask)
                        }} data-add-task-btn>Save</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditTask
