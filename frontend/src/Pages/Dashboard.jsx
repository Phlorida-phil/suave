import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, logout, reset} from '../features/auth/authSlice'
import {getProjects, projectReset} from '../features/projects/projectSlice'
import {getTasks, taskReset} from '../features/tasks/taskSlice'

import TaskCard from '../components/taskCard'
import ProjectCard from '../components/projectCard'
import LoginModal from '../components/loginModal'
import Nav from '../components/nav'


function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalAction, setModalAction] = useState()


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  const {projects, projectIsError, message} = useSelector((state) => state.projects)
  const {tasks, taskIsError} = useSelector((state) => state.tasks)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
  }

  useEffect(() => {
    if(projectIsError) {
      console.log(message)
    }

    if(taskIsError) {
      console.log(message)
    }

    dispatch(getProjects())
    dispatch(getTasks())

    return () => { dispatch(reset)
    }


  }, [user, dispatch, message])

  const today = new Date()

  const upcomingTasks = tasks.filter((task) => ( task.start.Date() > today ))

  console.log(upcomingTasks)

  return (

    <>
      <Nav />
      <LoginModal open={isOpen} setIsOpen={setIsOpen} modalAction={modalAction} setModalAction={setModalAction}/>
      <div>
        <h1 className="banner">Viviendo el Sueno</h1>
      </div>
      <div className="login">
        {user ? <a onClick={onLogout}>Hi {user.name}</a> : <a onClick={() => {setIsOpen(true); setModalAction("login")}}>Login</a>}
      </div>

      <div className="progress-section">
        <div className="progress-title">
          <h3 className="progress-header">In Progress</h3>
        </div>
        <div className="progress-bar">
          <TaskCard />
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-title">
          <h3  className="progress-header">Upcoming Tasks</h3>
        </div>
        <div className="progress-bar">
          <TaskCard />
        </div>
      </div>
      <h1 className="banner">Projects</h1>
        {user ?
          <div>
            <button onClick={() => {setIsOpen(true); setModalAction("addProject")}} className="add-button">Add a Project</button>
          </div> :
          <></>}
      <div className="major-section">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} user={user} tasks={tasks.filter((task) => task.project === project._id)}/>
        ))}
      </div>
  </>

  );
}

export default Dashboard;
