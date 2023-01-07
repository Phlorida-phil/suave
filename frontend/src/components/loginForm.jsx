import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'

function LoginForm({setIsOpen, setModalAction}) {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  })

  const {name, password} = formData

  const {user, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {

    if(isSuccess || user) {
      setIsOpen(false)
    }

    dispatch(reset())

  }, [user, isError, dispatch, message, ])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      password
    }

    dispatch(login(userData))

    setIsOpen(false)
    setModalAction(null)

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
            type='password'
            className='modal-input'
            id="password"
            name='password'
            value={password}
            placeholder="Enter Password"
            onChange={onChange} />
        </div>
        <button type='submit' className="btn btn-submit">Login</button>
        <button onClick={() => {setIsOpen(false); setModalAction(null)}} className='btn btn-cancel'>Cancel</button>
      </form>
    </>
  )
}

export default LoginForm
