import React from 'react'
import { useParams } from 'react-router-dom'

const TaskId = () => {
  const {id} = useParams() as {id: string};
  return (
    <div>TaskId {id}</div>
  )
}

export default TaskId