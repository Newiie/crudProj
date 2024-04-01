import { useState } from 'react';
import { useApp } from '../hooks/TaskProvider'

const EditProject = () => {
    const { setEditProjectBtn, handleEditProject, currentProject } = useApp();
    const iconsName = ["fa-book", "fa-hammer", "fa-volleyball", "fa-sack-dollar", "fa-pizza-slice",  "fa-school", "fa-gift"]
    const [iconSelectedIndex, setSelectedIndex] = useState(0)
    const [tempTitle, setTempTitle] = useState(currentProject.name)
  return (
    <div className="add-project modal" data-add-project-container>
            <div className="ap-body">
                <div className="add-project-title">
                    <h2>Edit Project</h2>
                    <i className="fa-solid fa-xmark apbody-close-btn" onClick={() => setEditProjectBtn(false)} data-close-project-btn></i>
                </div>
                <div className="add-project-input">
                    <label htmlFor="title">Project Name*</label>
                    <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} name="title" id="title" data-add-project-text-title />
                </div>
                <div className="add-project-icon-container">
                    <p>Icon</p>
                    <div className="icons" data-icons-container>
                        {iconsName.map((icon, index) => {
                            return <div key={icon} 
                            onClick={() => setSelectedIndex(index)} 
                            className={`icon ${iconSelectedIndex == index ? "icon-selected" : ""}`} id={icon}>
                                <i className={`fa-solid ${icon}`}></i>
                            </div>
                        })}
                    </div>
                </div>
                <hr className="hr-90"/>
                <div className="add-project-btns">
                    <button className="cancel-btn" onClick={() => setEditProjectBtn(false)} data-ap-cancel-btn>Cancel</button>
                    <button className="add-btn" onClick={async () => {
                        handleEditProject(tempTitle, iconsName[iconSelectedIndex])
                    }} data-ap-add-btn>Save</button>
                </div>
            </div>
        </div>
  )
}

export default EditProject
