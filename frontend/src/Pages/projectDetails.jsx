import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

import {getTasks, taskReset} from '../features/tasks/taskSlice'

import LoginModal from '../components/loginModal'
import TaskList from '../components/taskList'


function ProjectDetails() {

  const location = useLocation()
  const project = location.state.project
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [modalAction, setModalAction] = useState()

  const {user} = useSelector((state) => state.auth)
  const {tasks, taskIsError, message} = useSelector((state) => state.tasks)

  useEffect(() => {
    if(taskIsError) {
      console.log(message)
    }

    dispatch(getTasks())

    return () => { dispatch(taskReset)
    }


  }, [user, dispatch, message])

  const Tasks = tasks.filter((task) => task.Project === project._id)

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let projectCost = Tasks.map((task) => {
    return task.cost
  })

  projectCost = projectCost.reduce((a,b) => a + b, 0)


  return (
    <>
      <LoginModal open={isOpen} setIsOpen={setIsOpen} modalAction={modalAction} project={project} setModalAction={setModalAction}/>
        <div>
          <h2 className="task-title">{project.name}</h2>
          <button className="btn-small btn-edit"> Edit </button>
            <div className="budget-items">
              <div className="budget-card">
                <h4 className="budget-detail">Budget:</h4>
                <h4 className="budget-detail">{USDollar.format(project.budget)}</h4>
              </div>
              <div className="budget-card">
                <h4 className="budget-detail">Spent:</h4>
                <h4 className="budget-detail">{USDollar.format(projectCost)}</h4>
              </div>
            </div>

          <h2 className="task-title">Project Tasks</h2>
            <div className="task-section">
              <ul className="task-body">
                <li className="detail-header">
                  <div className="task-detail">
                    <p className="task-headers">Task</p>
                    <p className="task-headers">Status</p>
                    <p className="task-headers">Start</p>
                    <p className="task-headers">Cost</p>
                  </div>
                </li>

                {Tasks.map((task) => (
                  <TaskList key={task._id} task={task}/>
                ))}

                <li><button onClick={() => {setIsOpen(true); setModalAction("addTask"); console.log(modalAction)}} className="add-button">Add A Task</button></li>
              </ul>
            </div>
        </div>
    </>
  )
}

export default ProjectDetails
