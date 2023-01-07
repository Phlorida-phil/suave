import {useDispatch} from 'react-redux'
import {useState} from 'react'

import {deleteTask} from '../features/tasks/taskSlice'

function DeleteTask ({task, setIsOpen, setModalAction}) {

  const dispatch = useDispatch()

  return (
    <>
      <div className="modal-form">
        <h4>Are You Sure you want to Delete this Task?</h4>
        <button onClick={() => {setIsOpen(false); setModalAction(null)}} className='btn btn-cancel'>Cancel</button>
        <button onClick={() => {dispatch(deleteTask(task._id)); setIsOpen(false); setModalAction(null)}} className='btn btn-delete'>Delete</button>
      </div>
    </>
  )
}

export default DeleteTask
