import {useSelector, useDispatch} from 'react-redux';
import {getTasks, taskReset} from '../features/tasks/taskSlice'

function TaskCard() {

  return (
    <div className="progress-card">
      <h5 className="card-title">
        <a>Flooring</a>
      </h5>
      <ul>
        <li className="progress-list">
          <p><a>Move sand and Gravel to otherside of drive way</a></p>
        </li>
        <li className="progress-list">
            <p>Est Completetion: 1 Day</p>
        </li>
      </ul>
    </div>
  )
}

export default TaskCard
