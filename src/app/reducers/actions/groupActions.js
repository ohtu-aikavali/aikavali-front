import groupConstants from '../constants/groupConstants'
import groupService from '../../services/groupService'

export const createGroup = (data) => {
  return async (dispatch) => {
    const newGroup = await groupService.createGroup(data)
    dispatch({
      type: groupConstants.CREATE_GROUP_SUCCESSFUL,
      data: newGroup
    })
  }
}
