import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import HomePostItem from '../HomePostItem'
import Header from '../Header'
import DisplayMyProfile from '../DisplayMyProfile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {myProfileStatus: apiStatusConstants.initial, myProfileList: {}}

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({myProfileStatus: apiStatusConstants.loading})
    const myProfileUrl = `https://apis.ccbp.in/insta-share/my-profile`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(myProfileUrl, options)
    const data = await response.json()
    console.log(data, myProfileUrl)
    if (response.ok === true) {
      this.setState({
        myProfileList: data.profile,
        myProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({myProfileStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMyProfile()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686549682/Path_2x_1_rc4qha.png"
        alt="failure view"
        className="homeFailure"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retryBtn" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileView = () => {
    const {myProfileList} = this.state
    return (
      <div>
        <DisplayMyProfile item={myProfileList} />
      </div>
    )
  }

  renderMyProfile = () => {
    const {myProfileStatus} = this.state
    switch (myProfileStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderMyProfileView()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {myProfileStatus, myProfileList} = this.state
    console.log(myProfileStatus, myProfileList)
    return (
      <div>
        <Header />
        {this.renderMyProfile()}
      </div>
    )
  }
}

export default MyProfile
