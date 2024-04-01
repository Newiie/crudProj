import { useState } from "react"
import { useApp } from "../hooks/TaskProvider"

/* eslint-disable react/prop-types */
const AddProject = ({setShowAddProject}) => {
    const {handleAddProject} = useApp();

    const iconsName = ["fa-book", "fa-hammer", "fa-volleyball", "fa-sack-dollar", "fa-pizza-slice",  "fa-school", "fa-gift"]
    const [iconSelectedIndex, setSelectedIndex] = useState(0)

    const [projectName, setProjectName] = useState("")

    const handleChangeProject = (e) => {
        setProjectName(e.target.value)
    }

    return (
      <div className="add-project modal" data-add-project-container>
              <div className="ap-body">
                  <div className="add-project-title">
                      <h2>Add Project</h2>
                      <i className="fa-solid fa-xmark apbody-close-btn" onClick={() => setShowAddProject(false)} data-close-project-btn></i>
                  </div>
                  <div className="add-project-input">
                      <label htmlFor="title">Title*</label>
                      <input type="text" value={projectName} onChange={handleChangeProject} name="title" id="title" data-add-project-text-title />
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
                      <button className="cancel-btn" onClick={() => setShowAddProject(false)} data-ap-cancel-btn>Cancel</button>
                      <button onClick={() => {
                        handleAddProject(projectName, iconsName[iconSelectedIndex])
                        setShowAddProject(false)
                        }} className="add-btn" data-ap-add-btn>Add</button>
                  </div>
              </div>
          </div>
    )
  }
  
  export default AddProject
  