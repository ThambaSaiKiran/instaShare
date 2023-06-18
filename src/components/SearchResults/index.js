import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SearchContext from '../../context/searchContext'
import HomePostItem from '../HomePostItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchResults extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    fetchedData: [],
    searchText: '',
  }

  componentDidMount() {
    console.log('idd')
    this.getFetchedData()
    return (
      <SearchContext.Consumer>
        {async value => {
          const {searchText} = value
          console.log(searchText)
          console.log(value)
          // await this.setState({searchText})
          console.log(`Local ${localStorage.getItem('searchText')}`)
          return this.getFetchedData(searchText)
        }}
      </SearchContext.Consumer>
    )
  }

  getFetchedData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {searchText} = this.state
    const searchedText = localStorage.getItem('searchText')
    console.log(`search ${localStorage.getItem('searchText')}`)
    console.log('hi')
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchedText}`
    console.log(searchUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchUrl, options)
    const responseData = await response.json()
    if (response.ok === true) {
      this.setState({
        fetchedData: responseData.posts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getFetchedData()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686747611/Group_7522_2x_1_e8bbx1.png"
        alt="failure view"
        className="homeFailure"
      />
      <p>Something went wrong. Please try again</p>
      <button type="retryBtn" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickUserName = Id => {
    const {history} = this.props
    history.replace(`/users/${Id}`)
    console.log(Id)
  }

  renderSearchView = () => {
    const {fetchedData} = this.state
    console.log(this.state)
    return (
      <div>
        {console.log(<p>fetched</p>)}
        {fetchedData.length === 0 ? (
          <div className="notFoundCont">
            <img
              src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686747261/Group_2x_1_nfvvcp.png"
              alt="search not found"
              className="notFound"
            />
            <h1>Search Not Found</h1>
            <p>Try different keyword or search again</p>
          </div>
        ) : (
          <ul className="postList">
            {fetchedData.map(eachItem => (
              <HomePostItem
                key={eachItem.post_id}
                item={eachItem}
                onClickUserName={this.onClickUserName}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSearchList = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSearchView()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {fetchedData} = this.state
    console.log(this.state)
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchText} = value
          console.log(searchText)
          console.log(value)
          return (
            <div>
              <Header />
              <h1 className="searchHead">Search Results</h1>
              <div>{this.renderSearchList()}</div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchResults
