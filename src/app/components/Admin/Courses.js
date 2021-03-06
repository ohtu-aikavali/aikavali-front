import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { fetchCourses, createCourse } from '../../reducers/actions/courseActions'
import Course from './Course'

class Courses extends Component {
  state = {
    name: '',
    imageSrc: '',
    description: ''
  }

  componentDidMount() {
    this.props.fetchCourses()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createCourse(this.state)
  }

  handleChange = (e) => {
    e.preventDefault()
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState((prevState) => ({ ...prevState, ...newState }))
  }

  render() {
    const { courses } = this.props
    const { name, imageSrc, description } = this.state
    return (
      <div className='admin-courses'>
        <div>
          <h1>Lisää kurssi</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name='name'
              id='name'
              label='Nimi'
              type='text'
              fullWidth
              value={name}
              onChange={this.handleChange}
            />
            <TextField
              name='imageSrc'
              id='imageSrc'
              label='Kuva'
              type='text'
              fullWidth
              value={imageSrc}
              onChange={this.handleChange}
            />
            <TextField
              name='description'
              id='description'
              label='Kuvaus'
              type='text'
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={this.handleChange}
            />
            <Button style={{ marginTop: '10px' }} color='primary' type='submit' variant='contained'>Tallenna</Button>
          </form>
        </div>
        <h1>Kaikki kurssit</h1>
        {courses.map((c, i) => <Course key={i} course={c} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.courses
})

const mapDispatchToProps = {
  fetchCourses,
  createCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)