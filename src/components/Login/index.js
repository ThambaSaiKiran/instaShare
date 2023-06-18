import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({isError: true, errMsg: error})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const logUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(logUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errMsg} = this.state
    console.log(isError, errMsg)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginMainCont">
        <img
          src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686399373/Layer_2_exft52.png"
          alt="website login"
          className="website-login"
        />
        <div className="loginCont">
          <img
            src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686400236/Standard_Collection_8_1_hkcgue.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="login-head">Insta Share</h1>
          <div className="formCont">
            <form onSubmit={this.onSubmitForm} className="form">
              <label htmlFor="name">USERNAME</label>
              <input
                id="name"
                type="text"
                value={username}
                placeholder="Username"
                className="username"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                className="password"
                onChange={this.onChangePassword}
              />
              {isError && <p className="errMsg">{errMsg}</p>}
              <button type="submit" className="loginButton">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
