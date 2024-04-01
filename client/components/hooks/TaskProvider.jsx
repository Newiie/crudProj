/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside ContextProvider");
  }
  return context;
}


const ContextProvider = ({ children }) => {
    const [showAddProject, setShowAddProject] = useState(false)
    const [activeProject, setActiveProject] = useState("All")
    const [projectDeleteId, setprojectDeleteId] = useState("")
    const [taskDelteId, setTaskDeleteId] = useState("")
    const [genreDelete, setGenreDelete] = useState("")
    const [projects, setProjects] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    
    const [editProjectId ,setEditProjectId] = useState("")
    
    const navItem = [
      {
        name: "All",
        icon: "fa-regular fa-calendar-days"
      },
      {
        name: "Today",
        icon: "fa-solid fa-calendar-day"
      },
      {
        name: "Week",
        icon: "fa-solid fa-calendar-week"
      },
      {
        name: "Important",
        icon: "fa-regular fa-calendar-days"
      },
      {
        name: "Completed",
        icon: "fa-regular fa-calendar-check"
      }
    ] 

    
    const [editProjectBtn, setEditProjectBtn] = useState(false)
    const [activeNav, setActiveNav] = useState("nav")
    const [addTaskBtn, setAddTaskBtn] = useState(false)
    const [showDeleteModal, setDeleteModal] = useState(false) 
    const [showInfoTask, setInfoTask] = useState(false)
    const [task, setTask] = useState({})
    const [currentProject, setCurrProject] = useState({})
    const [showEditTask, setShowEditTask] = useState(false)
    const [showDeleteTaskModal ,setDeleteTaskModal] = useState(false)

    const handleEditProject = async (name, icon) => {
      try {
          setIsFetching(true)
          const response = await axios({
            method: "PUT",
            url: `http://localhost:5000/edit/project/${currentProject.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 
              name,
              icon,
            }
          });
          console.log("Response Approve Event", response)
          setIsFetching(false)
          setEditProjectBtn(false)
      } catch (error) {
          console.error('Error updating project:', error);
      }
  };
  

    const handleEditTask = async (p_task) => {

      try {
        setIsFetching(true)
        const response = await axios({
          method: "PUT",
          url: `http://localhost:5000/edit/project/${currentProject.id}/task/${p_task.id}`,
          headers: {
              'Content-Type': 'application/json'
          },
          data: { 
            title:p_task.title,
            description:p_task.description,
            complete:p_task.complete,
            date:p_task.date,
            priority:p_task.priority
          }
        });
        console.log("Response Approve Event", response)
        setShowEditTask(false)
        setIsFetching(false)
      } catch (error) {
          console.error('Error updating project:', error);
      }
    }

    const handleAddProject = async (name, icon) => {
      setIsFetching(true)
      const response = await axios({
        method: "POST",
        url: 'http://localhost:5000/create/project',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { 
          name,
          icon
        }
      });
      console.log("RESPONSE", response)
      setIsFetching(false)
    }

    const handleAddTask = async (title, description, date, priority) => {
      setIsFetching(true)
      const response = await axios({
        method: "POST",
        url: 'http://localhost:5000/create/task',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { 
          id: Date.now().toString(),
          title,
          complete: false,
          description,
          date, 
          priority,
          projectId: currentProject.id
        }
      });
      console.log("RESPONSE", response)
      setAddTaskBtn(false)
      setIsFetching(false)
    }

    const deleteProject = async (id) => {
      try {
        setIsFetching(true)
        const response = await axios({
          method: "DELETE",
          url: `http://localhost:5000/delete/project/${currentProject.id}`, 
          headers: {
              'Content-Type': 'application/json'
          }
        })
        setProjects([])
        setIsFetching(false)
        console.log("RESPONSE DELETE", response.data); 
        
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }

    const deleteTask = async (id) => {
      try {
        setIsFetching(true)
        const taskId = id;
        const response = await axios({
          method: "DELETE",
          url: `http://localhost:5000/delete/project/${currentProject.id}/task/${taskId}`,
          headers: {
              'Content-Type': 'application/json'
          }
        });
        console.log("RESPONSE", response.data); 
        setIsFetching(false)
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  
    const contextValue = {
        isFetching,
        setIsFetching,
        handleEditTask,
        showAddProject,
        setShowAddProject,
        activeProject,
        setActiveProject,
        projects,
        setProjects,
        editProjectBtn,
        setEditProjectBtn,
        activeNav,
        setActiveNav,
        addTaskBtn,
        setAddTaskBtn,
        showDeleteModal,
        setDeleteModal,
        showInfoTask,
        setInfoTask,
        task,
        setTask,
        currentProject,
        setCurrProject,
        showEditTask,
        setShowEditTask,
        navItem,
        handleAddProject,
        handleAddTask,
        deleteProject,
        projectDeleteId,
        setprojectDeleteId,
        taskDelteId,
        setTaskDeleteId,
        genreDelete,
        setGenreDelete,
        editProjectId,
        setEditProjectId,
        handleEditProject,
        deleteTask,
        setDeleteTaskModal,
        showDeleteTaskModal
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export default ContextProvider;  