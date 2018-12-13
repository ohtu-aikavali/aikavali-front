import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

export const DrawerList = () => {
  return (
    <div className='drawerList'>
      <List>
        <ListItem button component="a" href="#/newquestion">
          <ListItemText primary="LISÄÄ KYSYMYS" />
        </ListItem>
        <Divider />
      </List>
    </div>
  )
}

export default DrawerList