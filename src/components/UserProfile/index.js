import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import HomePostItem from '../HomePostItem'
import Header from '../Header'
import DisplayOtherUserProfile from '../DisplayOtherUserProfile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userProfileStatus: apiStatusConstants.initial, userProfileList: {}}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userProfileStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(userProfileUrl, options)
    const data = await response.json()
    console.log(data, userProfileUrl, userId, params)
    if (response.ok === true) {
      this.setState({
        userProfileList: data.user_details,
        userProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userProfileStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getUserProfile()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686549682/Path_2x_1_rc4qha.png"
        alt="failure view"
        className="homeFailure"
      />
      <h1>No Posts</h1>
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

  renderUserProfileView = () => {
    const {userProfileList} = this.state
    return (
      <div>
        <DisplayOtherUserProfile item={userProfileList} />
      </div>
    )
  }

  renderUserProfile = () => {
    const {userProfileStatus} = this.state
    switch (userProfileStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderUserProfileView()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {userProfileStatus, userProfileList} = this.state
    console.log(userProfileStatus, userProfileList)
    return (
      <div>
        <Header />
        {this.renderUserProfile()}
      </div>
    )
  }
}

export default UserProfile
