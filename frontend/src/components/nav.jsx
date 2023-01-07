import {useNavigate} from 'react-router-dom'

function Nav() {

  const navigate = useNavigate()

  return (
    <>
      <div className='nav-bar'>
        <button onClick={navigate('/')} className='btn nav-btn'>Home</button>
        <button>Login</button>
      </div>
    </>
  )
}

export default Nav
