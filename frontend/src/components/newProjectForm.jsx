import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createProject, projectReset} from '../features/projects/projectSlice'

function ProjectForm({setIsOpen, setModalAction}) {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    budget: ''
  })

  const {name, budget} = formData

  const {projects, isError, isLoading, isSuccess, message} = useSelector((state) => state.projects)

  useEffect(() => {

    if(isSuccess) {
      setIsOpen(false)
    }

    dispatch(projectReset())

  }, [projects, isError, dispatch, message, ])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const projectData = {
      name,
      budget
    }
    setIsOpen(false)
    setModalAction(null)

    dispatch(createProject(projectData))

  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <div className="modal-form">
          <input
            type='text'
            className='modal-input'
            id="name"
            name='name'
            value={name}
            placeholder="Enter Name"
            onChange={onChange} />
          <input
            type='number'
            className='modal-input'
            id="budget"
            name='budget'
            value={budget}
            onChange={onChange} />
        </div>
        <button type='submit' className="btn btn-submit">Add Project</button>
        <button onClick={() => {setIsOpen(false); setModalAction(null)}} className='btn btn-cancel'>Cancel</button>
      </form>
    </>
  )
}

export default ProjectForm
