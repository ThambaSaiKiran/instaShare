import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import HomePostItem from '../HomePostItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    userStoriesStatus: apiStatusConstants.initial,
    userPostsStatus: apiStatusConstants.initial,
    userStoriesList: [],
    userPostsList: [],
  }

  componentDidMount() {
    this.getUserStories()
    this.getUserPosts()
  }

  getUserStories = async () => {
    this.setState({userStoriesStatus: apiStatusConstants.loading})
    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(storiesUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.users_stories.map(eachItem => ({
      userId: eachItem.user_id,
      userName: eachItem.user_name,
      storyUrl: eachItem.story_url,
    }))
    console.log(updatedData)
    if (response.ok === true) {
      this.setState({
        userStoriesList: updatedData,
        userStoriesStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userStoriesStatus: apiStatusConstants.failure})
    }
  }

  getUserPosts = async () => {
    this.setState({userPostsStatus: apiStatusConstants.loading})
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(postsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        userPostsList: data.posts,
        userPostsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userPostsStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getUserPosts()
    this.getUserStories()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686549682/Path_2x_1_rc4qha.png"
        alt="failure view"
        className="homeFailure"
      />
      <p>Something went wrong. Please try again</p>
      <button type="retryBtn" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderStoriesView = () => {
    const {userStoriesList} = this.state
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userStoriesList.map(eachItem => {
            const {userId, userName, storyUrl} = eachItem
            return (
              <div className="slick-item1" key={userId}>
                <img className="storyImage" src={storyUrl} alt="user story" />
                <p>{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderStoriesList = () => {
    const {userStoriesStatus} = this.state
    switch (userStoriesStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderStoriesView()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  onClickUserName = Id => {
    const {history} = this.props
    history.replace(`/users/${Id}`)
    console.log(Id)
  }

  renderPostsView = () => {
    const {userPostsList} = this.state
    return (
      <div>
        <ul className="postList">
          {userPostsList.map(eachItem => (
            <HomePostItem
              key={eachItem.post_id}
              item={eachItem}
              onClickUserName={this.onClickUserName}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderPostsList = () => {
    const {userPostsStatus} = this.state
    switch (userPostsStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderPostsView()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {userStoriesList, userPostsStatus, userPostsList} = this.state
    console.log(userStoriesList, userPostsList, userPostsStatus)
    return (
      <div>
        <Header />
        {this.renderStoriesList()}
        {this.renderPostsList()}
      </div>
    )
  }
}

export default Home
