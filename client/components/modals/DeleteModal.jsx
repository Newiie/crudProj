import { useApp } from '../hooks/TaskProvider'

const DeleteModal = () => {
    const {setDeleteModal, deleteProject, projectDeleteId, projects} = useApp();
    const currProject = projects.find(project => project.id = projectDeleteId)
  return (
    <div className="delete-modal modal"  data-delete-modal>
        <div className="delete-modal-body">
            <div className="dm-header-container">
                <h2>Delete Project</h2>
                <i className="fa-solid fa-xmark dm-close-btn" data-dm-close-button></i>
            </div>
            <div className="dm-content">
                <p>Are you sure?</p>
                <p >Project <span className="dm-label">{currProject.name}</span>  will be deleted!</p>
                <hr/>
                <div className="dm-btns">
                    <button className="cancel-btn" onClick={() => setDeleteModal(false)} data-dm-cancel-btn>Cancel</button>
                    <button className="delete-btn" onClick={() => {
                        setDeleteModal(false)
                        deleteProject(projectDeleteId)
                    }} data-dm-delete-btn>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal
