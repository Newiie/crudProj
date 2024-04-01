/* eslint-disable react/prop-types */
import { useApp } from './hooks/TaskProvider'

const Project = ({project}) => {
    const {activeProject, setActiveProject, setEditProjectBtn, setActiveNav, setDeleteModal, setCurrProject, setprojectDeleteId,
      setGenreDelete, setEditProjectId} = useApp()

  return (
    <div className={`project ${activeProject == project.id ? "project-selected" : ""}`} onClick={() => {
            setActiveProject(project.id)
            setCurrProject(project)
            setActiveNav("project")
        }} >
        <div className="project-content">
            <i className={`fa-solid ${project.icon}`}></i>
            <p className="project-label">{project.name}</p>
        </div>
        <div className="editables">
            <i className="fa-regular fa-pen-to-square icon-editable" onClick={() => {
              setEditProjectBtn(true)
              setEditProjectId(project.id)
              }}></i>

            <i className="fa-solid fa-trash icon-editable" onClick={() => {
              setprojectDeleteId(project.id)
              setGenreDelete("project")
              setDeleteModal(true)
              }}></i>
        </div>
    </div>
  )
}

export default Project
