import { useApp } from '../hooks/TaskProvider'

const DeleteTaskModal = () => {
    const {setDeleteTaskModal, deleteTask, taskDelteId, currentProject} = useApp();
    const task = currentProject.tasks.find(task => task.id == taskDelteId)
    console.log(task)
    return (
      <div className="delete-modal modal"  data-delete-modal>
          <div className="delete-modal-body">
              <div className="dm-header-container">
                  <h2>Delete Task: <span className="dm-label">{task.title}</span></h2>
                  <i onClick={() => setDeleteTaskModal(false)} className="fa-solid fa-xmark dm-close-btn" data-dm-close-button></i>
              </div>
              <div className="dm-content">
                  <p>Are you sure?</p>
                  <p ><span className="dm-label">Task will be deleted!</span></p>
                  <hr/>
                  <div className="dm-btns">
                      <button className="cancel-btn" onClick={() => setDeleteTaskModal(false)} data-dm-cancel-btn>Cancel</button>
                      <button className="delete-btn" onClick={() => {
                          setDeleteTaskModal(false)
                          deleteTask(taskDelteId)
                      }}data-dm-delete-btn>Delete</button>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default DeleteTaskModal
