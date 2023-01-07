import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ReactDom from 'react-dom'

import {login, reset} from '../features/auth/authSlice'

import LoginForm from './loginForm'
import ProjectForm from './newProjectForm'
import TaskForm from './newTaskForm'
import DeleteTask from './deleteTask'

function LoginModal({open, setIsOpen, modalAction, setModalAction, project, task}) {

  if(!open) return null

  if(modalAction=='addTask') { return (
    <>
    <div className="overlay">
      <div className="modal">
        <TaskForm setIsOpen={setIsOpen} setModalAction={setModalAction} project={project} />
      </div>
    </div>
    </>
  )}

  if(modalAction=='deleteTask') { return (
    <>
    <div className="overlay">
      <div className="modal">
        <DeleteTask setIsOpen={setIsOpen} setModalAction={setModalAction} task={task} />
      </div>
    </div>
    </>
  )}

  return ReactDom.createPortal(
    <>
      <div className="overlay">
        <div className="modal">
          {modalAction=='login' ?
            <LoginForm setIsOpen={setIsOpen} setModalAction={setModalAction}/>
            : <ProjectForm setIsOpen={setIsOpen} setModalAction={setModalAction} />}
        </div>
      </div>
    </>,
  document.getElementById('portal')
  )
}

export default LoginModal
