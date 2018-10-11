import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
// import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  wrapper: {
    maxWidth: '365px',
    margin: '0 auto',
    cursor: 'pointer'
  },

  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  }
})

export class QuestionAnswer extends Component {
  handleClick = () => {
    const { id, value, userAnswer, selected } = this.props
    if (!userAnswer && !selected) {
      this.props.handleSelect(id, value)
    } else if (!userAnswer && selected) {
      this.props.handleConfirm(id, value)
    } else {
      console.log('already answered!')
    }
  }

  determineStyle = () => {
    const { userAnswer, value, selected } = this.props
    const selectedStyle = { borderStyle: 'solid', borderWidth: 2, borderColor: 'blue', backgroundColor: 'rgb(0, 55, 255, 0.3)' }
    const correctStyle = { borderStyle: 'solid', borderWidth: 2, borderColor: 'green', backgroundColor: 'rgb(68, 255, 0, 0.5)' }
    const wrongStyle = { borderStyle: 'solid', borderWidth: 2, borderColor: 'red', backgroundColor: 'rgb(255, 0, 0, 0.5)' }
    if (userAnswer && userAnswer.isCorrect && selected) {
      return correctStyle
    } else if (userAnswer && userAnswer.correctAnswer === value) {
      return correctStyle
    } else if (selected && userAnswer && !userAnswer.isCorrect) {
      return wrongStyle
    } else if (selected && !userAnswer) {
      return selectedStyle
    }
    return null
  }

  render () {
    const { classes, value } = this.props
    const style = this.determineStyle()
    return (
      <div className={classes.wrapper} id='container' onClick={this.handleClick}>
        <Paper className={classes.paper} id='paper' style={style}>
          <Grid container wrap="nowrap" spacing={16} className='containerGrid'>
            <Grid item className='itemGrid'>
              <Typography className='typography' align="center">{value}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAnswer: state.question.userAnswer
  }
}

QuestionAnswer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionAnswer))