import React, { Component } from 'react'
import { connect } from 'react-redux'
import './frontPage.css'
import { loggedUserInitialization, logout } from '../../reducers/actions/authActions'
import { getRandomQuestion } from '../../reducers/actions/questionActions'
import { initializeGame } from '../../reducers/actions/gameActions'
import Question from '../Question'

// exported for tests
export class FrontPage extends Component {

  async componentDidMount () {
    await this.props.loggedUserInitialization()
    await this.props.initializeGame()
    await this.props.getRandomQuestion()
  }

  async componentWillReceiveProps (nextProps) {
    if (!nextProps.loggedUser.loggedUser) {
      // If user logs out, a new "unregistered" user is created, so user will get
      // "fresh/new" questions. This is also null ONLY if user logs out.
      await this.props.loggedUserInitialization()
      // Try it out, if u press Tyhjennä localstorgae, u will get new questions immediately
      // Tarvii ottaa tieto, että suoritus ei ole vielä alkanut
      await this.props.initializeGame()
      await this.props.getRandomQuestion()
    }
  }

  render () {
    const user = this.props.loggedUser.loggedUser
    return (
      <div className='frontPageContainer' style={{ marginTop: 50 }}>
        {false && user &&
          (
            <div className="user-info">
              <p>User id: {user.id}, User token: {false && user.token}</p>
              {!user.token ? <p>Käyttäjä ei ole rekisteröitynyt (Jos käyttäjällä token, on rekisteröitynyt)</p> : <p>Käyttäjä on rekisteröitynyt</p>}
            </div>
          )
        }
        <Question />
        {<button onClick={this.props.logout}>Tyhjennä localStorage</button>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
const mapDispatchToProps = {
  loggedUserInitialization,
  logout,
  getRandomQuestion,
  initializeGame
}

const ConnectedFrontPage = connect(mapStateToProps, mapDispatchToProps)(FrontPage)

export default ConnectedFrontPage
