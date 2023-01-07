import {useDispatch} from 'react-redux'
import {useState} from 'react'

import {deleteTask} from '../features/tasks/taskSlice'

import LoginModal from './loginModal'

function TaskList({task}) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalAction, setModalAction] = useState(false)

  const dispatch = useDispatch()

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  return(
    <>
    <LoginModal task={task} open={isOpen} setIsOpen={setIsOpen} modalAction={modalAction} setModalAction={setModalAction} />
      <li className="detail-list">
        <div className="task-row">
          <div className="task-detail">
            <p className="task-info">{task.description}</p>
            <p className="task-info">{task.start > new Date() ? 'Ongoing' : 'Upcoming'}</p>
            <p className="task-info">{new Date(task.start).toLocaleDateString('en-US')}</p>
            <p className="task-info">{USDollar.format(task.cost)}</p>
          </div>
          <div className="task-buttons">
            <button className="btn-small btn-edit"> Edit </button>
            <button onClick={() => {setIsOpen(true); setModalAction('deleteTask')}} className="btn-small btn-delete"> Delete </button>
          </div>
        </div>
      </li>
    </>
  )
}

export default TaskList
