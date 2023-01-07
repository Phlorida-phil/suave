import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom'

function ProjectCard({user, project}) {

  const navigate = useNavigate()

  const toProject = () => {
    navigate('/project', {state:{project:project, user:user}});
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return(
    <>
      <div className="task-card">
        <h4 className="task-title"><a onClick={(project) =>{toProject()}}>{project.name}</a></h4>
        <div>
          <div className="task-timeline">
            <h5>EST Completetion:</h5>
            <p>1/1/2023</p>
          </div>
          <div className="task-timeline">
            <h5>EST Duration:</h5>
            <p>1 Month</p>
          </div>
        </div>
        <div>
          <ul>
            <li className="progress-list">
              <p><a>Install and Hook up A/C Compresors</a></p>
            </li>
            <li className="progress-list">
              <p><a>Downstairs Electircal Wiring</a></p>
            </li>
            <li className="progress-list">
              <p><a>Upstairs Electircal Wiring</a></p>
            </li>
            <li className="progress-list">
              <p><a>Downstairs Electircal Wiring</a></p>
            </li>
          </ul>
        </div>
        {user ?
          <>
          <h5 className="budget-info">EST Budget {USDollar.format(project.budget)}</h5>
          <h5 className="budget-info">Actual Spend {USDollar.format(2000)}</h5>
          </>
          : <></>
        }


      </div>
    </>
  )
}

export default ProjectCard
