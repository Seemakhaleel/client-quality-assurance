import React from 'react'
import { useParams } from 'react-router-dom'

const Question = () => {
    const { id } = useParams();

  return (
    <div>
      <h1>Question {id}</h1>
    </div>
  )
}

export default Question
