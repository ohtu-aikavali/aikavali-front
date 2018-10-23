import React from 'react'
import Typography from '@material-ui/core/Typography'
import QuestionAnswer from './QuestionAnswer'

const CompileQuestion = ({ question, handleSelect, handleSkip, selected }) => {
  return (
    <div className='compileQuestion'>
      <Typography className='typography' variant="headline" align="center" color="default" gutterBottom>
        Valitse mikä koodinpätkä kääntyy
      </Typography>
      {question.options.map((option, i) => <QuestionAnswer key={i} value={option} id={question._id} handleSelect={handleSelect} handleSkip={handleSkip} selected={selected && selected.value === option} />)}
    </div>
  )
}

export default CompileQuestion
