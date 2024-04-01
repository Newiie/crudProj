// import { useApp } from "./hooks/TaskProvider"

const Nav = () => {
    // const {
    //     activeProject, 
    //     setActiveProject, 
    //     setActiveNav,
    //     navItem
    // } = useApp()

  return (
    <div className="due-date-container">
        <ul className="due-dates" data-due-dates>
            {/* {navItem.map(item => {
                return <li key={item.name} onClick={() =>  {
                    setActiveProject(item.name)
                    setActiveNav("nav")

                }} className={`date ${activeProject == item.name ? "project-selected" : ""}`} id="all-tasks" data-all-tasks>
                <i className={`${item.icon}`}></i>
                {item.name}</li>
            })} */}
        </ul>
    </div>
  )
}

export default Nav
