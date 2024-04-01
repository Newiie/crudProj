/* eslint-disable react/prop-types */
import { useState } from "react";
import { useApp } from "./hooks/TaskProvider";

const Task = ({ task }) => {
  const { setInfoTask, setDeleteTaskModal, setShowEditTask, setTask, setTaskDeleteId, setProjects, currentProject} = useApp();
  // const [complete, setComplete] = useState(task.complete)

  const handleEditClick = (e) => {
    e.stopPropagation();
    setTask(task)
    setShowEditTask(true);  
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setTaskDeleteId(task.id)
    setDeleteTaskModal(true);
  };


  return (
    <div
      className="task"
      data-task-body
      onClick={() => {
        setInfoTask(true);
        setTask(task);
      }}
    >
      <div className="task-content">
        <input onClick={(e) => {
            e.stopPropagation()
            setProjects(projects => {
              return projects.map(project => {
                if (project.id === currentProject.id) {
                  console.log("found it");
                  const updatedTasks = project.tasks.map(taskParam => {
                    if (taskParam.id === task.id) {
                      console.log("Found Task");
                      return {
                        ...taskParam,
                        complete: !taskParam.complete
                      };
                    }
                    return taskParam;
                  });
                  return {
                    ...project,
                    tasks: updatedTasks
                  };
                }
                return project;
              });
            });
            
          }} className={`in-checkbox ${task.complete ? "checked" : ""}`} type="checkbox" name="" id="" data-task-checkbox />
        <p className={`${task.complete ? "line-through" : ""}`} data-task-description>{task.title}</p>
      </div>

      <div className="task-icon">
        <i onClick={handleEditClick} className="fa-regular fa-pen-to-square" data-task-edit></i>
        <i onClick={handleDeleteClick} className="fa-regular fa-trash-can" data-task-delete></i>
        <i onClick={() => {
          setInfoTask(true);
          setTask(task);
        }} className="fa-solid fa-circle-info" data-task-info></i>
      </div>
    </div>
  );
};

export default Task;
