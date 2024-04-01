import { useApp } from "../hooks/TaskProvider"

const InfoTask = () => {
    const { setInfoTask, task, currentProject } = useApp();
    console.log("TASK", task)

  return (
    <div className="info-modal modal" data-info-modal>
    <div className="info-modal-body modal-body">
        <div className="add-project-title">
            <h2 className="modal-title"data-project-title>Task Info</h2>
            <i className="fa-solid fa-xmark apbody-close-btn" onClick={() => setInfoTask(false)} data-im-close-btn></i>
        </div>
        <div className="info-modal-content">
            <div className="im-container">
                <h5 className="im-container-title">Title: </h5>
                <p className="im-container-content" data-info-title>{task.title}</p>
            </div>
            <hr/>
            <div className="im-container desc-container">
                <h5 className="im-container-title" >Description: </h5>
                <textarea  value={task.description} readOnly className="im-container-content im-desc-content" data-info-desc></textarea >
            </div>
            <hr/>
            <div className="im-container">
                <h5 className="im-container-title" >Due Date:</h5>
                <p className="im-container-content" data-info-date>{task.date}</p>
            </div>
            <hr/>
            <div className="im-container">
                <h5 className="im-container-title">Priority: </h5>
                <p className="im-container-content"  data-info-prio>{task.priority}</p>
                
            </div>
            <hr/>
            <div className="im-container">
                <h5 className="im-container-title">Project Title: </h5>
                <p className="im-container-content" data-info-project>{currentProject.name}</p>
                
            </div>
            <hr/>
            <div className="add-project-btns">
                <button type="button" className="cancel-btn" onClick={() => setInfoTask(false)} data-info-cancel-btn>Cancel</button>
            </div>
        </div>
    </div>
</div> 
  )
}

export default InfoTask
