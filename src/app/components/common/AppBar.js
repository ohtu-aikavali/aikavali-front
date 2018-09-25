import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

export const ButtonAppBar = (props) => {
  const { classes } = props
  return (
    <div className='appBar'>
      <AppBar position='static' className='appBar_material'>
        <Toolbar className='toolbar_material'>
          <IconButton onClick={props.toggleDrawer} className='appBar_menu_button' color='inherit' aria-label='Menu'>
            <MenuIcon className='menuicon_material' />
          </IconButton>
          <Typography variant='title' color='inherit' className={classes.grow}>
            Aikavälikertaus
          </Typography>
          <Button onClick={() => console.log('login pressed')} color='inherit' className='appBar_login_button'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)