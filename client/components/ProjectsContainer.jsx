/* eslint-disable react/prop-types */
import Project from "./Project"
import { useApp } from "./hooks/TaskProvider"

const ProjectsContainer = ({setShowAddProject}) => {
    const { projects } = useApp();

  return (
    <div className="projects">
        <div className="projects-header">
            <h5 className="projects-title">Projects ({projects.length})</h5>
            <i className="fa-solid fa-circle-plus" onClick={() => setShowAddProject(true)} data-add-project-btn></i>
        </div>
        <hr/>
        <div className="projects-container" data-project-container>
            {
                projects.length > 0 ?
                projects.map(project => {
                    return (    
                        <Project key={project._id} project={project} />
                    )
                })
                :
                <div className="project">Wow no Project!</div>
            }
            
        </div>
        <hr/>
    </div>
  )
}

export default ProjectsContainer
