import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTask, taskReset} from '../features/tasks/taskSlice'

function TaskForm({setIsOpen, project, setModalAction}) {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    description: '',
    cost: '',
    duration: '',
    start: '',
    Project: project._id,
    completed: false,
  })

  const {description, cost, duration, start, Project, completed} = formData

  const {tasks, isError, isLoading, isSuccess, message} = useSelector((state) => state.tasks)

  useEffect(() => {

    if(isSuccess) {
      setIsOpen(false)
    }

    dispatch(taskReset())

  }, [tasks, isError, dispatch, message, ])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      description,
      cost,
      duration,
      start,
      Project,
      completed
    }
    setIsOpen(false)
    setModalAction(null)

    dispatch(createTask(taskData))

  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <div className="modal-form">
          <input
            type='text'
            className='modal-input'
            id="description"
            name='description'
            value={description}
            placeholder="Enter description"
            onChange={onChange} />
          <input
            type='number'
            className='modal-input'
            id="cost"
            name='cost'
            value={cost}
            onChange={onChange} />
            <input
              type='date'
              className='modal-input'
              id="start"
              name='start'
              value={start}
              onChange={onChange} />
              <input
                type='number'
                className='modal-input'
                id="duration"
                name='duration'
                value={duration}
                onChange={onChange} />
        </div>
        <button type='submit' className="btn btn-submit">Add Task</button>
        <button onClick={() => {setIsOpen(false); setModalAction(null)}} className='btn btn-cancel'>Cancel</button>
      </form>
    </>
  )
}

export default TaskForm
