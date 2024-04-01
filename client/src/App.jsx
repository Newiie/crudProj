/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
// import Nav from '../components/Nav';
import ProjectsContainer from '../components/ProjectsContainer';
import { useApp } from '../components/hooks/TaskProvider';
import AddProject from '../components/modals/AddProject';
import EditProject from '../components/modals/EditProject';
import AddTask from '../components/modals/AddTask';
import DeleteModal from '../components/modals/DeleteModal';
import InfoTask from '../components/modals/InfoTask';
import Task from '../components/Task';
import EditTask from '../components/modals/EditTask';
import DeleteTaskModal from '../components/modals/DeleteTaskModal';
import axios from 'axios';



const App = () => {
  const {
    editProjectBtn, activeNav, addTaskBtn, setAddTaskBtn, showDeleteModal, activeProject, projects,
    showInfoTask, showEditTask, currentProject, navItem, setProjects, showDeleteTaskModal, isFetching
  } = useApp();
  const [showAddProject, setShowAddProject] = useState(false)
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => {

    const getProjects = async () => {
      const response = await axios({
        method: "GET",
        url: 'http://localhost:5000/projects',
        headers: {
            'Content-Type': 'application/json'
        },
      });
      console.log("RESPONSE", response.data.projects)
      setProjects(response.data.projects)
    }
    getProjects();
  }, [isFetching]);

  return (
   <>
   <section id='container'>
   <section className="header">
            <i onClick={() => setMenuActive((prev) => !prev)} className={`fa-solid fa-bars menu`}></i>
            <i className="fa-solid fa-check-double"></i>
            Cam's To-do List
    </section>
    <section className={`content ${menuActive ? "active" : ""}`} >
            <div className="nav-bar">
                <ProjectsContainer setShowAddProject={setShowAddProject} />
            </div>
        </section>
        <div className="todo-container">
          {
            activeNav == "nav" ? 
            (
                navItem.map(item => {
                  if (item.name == activeProject) {
                    return (
                      <h1 key={item.name} className="todo-header">
                        <i className={item.icon}></i>
                        <p className="todo-header">{item.name}</p> 
                      </h1>
                    )
                  }
                })
            )
             : 
            (
              <h1 className="todo-header">
                <i className={`fa-solid ${currentProject.icon}`}></i>
                <p className="todo-header">{currentProject.name}</p> 
              </h1>
            )
          }
            <div className="todo-body">
                <div className="task-header-container">
                    <div className="task-header">Tasks ({
                      activeNav === "project" ?
                      currentProject.tasks.length : 0
                    })</div>
                    {activeNav == "project" && <i onClick={() => setAddTaskBtn(true)} className="fa-solid fa-circle-plus" ></i>}
                </div>
                <hr/>
                <div className="tasks-container" >
                {
                  activeNav === "project" && projects.map((project) => {
                    if (project.id === activeProject) {
                      return project.tasks.map(task => {
                        return (
                          <Task task={task} key={task.id}/>
                        );
                      });
                    }
                    return null;
                  }) 
                }
                </div>
            </div>
        </div>
        {showAddProject && <AddProject setShowAddProject={setShowAddProject} />}
        {editProjectBtn && <EditProject />}
        {addTaskBtn && <AddTask />}
        {showDeleteModal && <DeleteModal />}
        {showInfoTask && <InfoTask /> }
        {showEditTask && <EditTask />}
        {showDeleteTaskModal && <DeleteTaskModal />}
    </section>
   </>

  );
};

export default App;
