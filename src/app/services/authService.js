import axios from 'axios'
import userManager from '../utilities/userManager'

let baseUrl = ''
// This can not be tested. It's ok tho
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://aikavali-back.herokuapp.com'
}

const apiUrl = '/api/v1/user'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// For tests
const getToken = () => {
  return token
}

const login = async (username, password) => {
  try {
    await userManager.login(username, password)
    const response = await axios.post(`${baseUrl}${apiUrl}/login`, { user: userManager.getUser() })
    return response.data
  } catch (e) {
    return { error: 'Väärä käyttäjätunnus tai salasana!' }
  }
}

export default { setToken, getToken, login }
