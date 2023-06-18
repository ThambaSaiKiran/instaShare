import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import SearchContext from '../../context/searchContext'
import './index.css'

class Header extends Component {
  state = {searchInput: '', hamDisplay: false, searchMobile: false}

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleSearchMobile = () => {
    this.setState(prevState => ({
      searchMobile: !prevState.searchMobile,
    }))
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onToggleBurger = () => {
    this.setState(prevState => ({
      hamDisplay: !prevState.hamDisplay,
      searchMobile: !prevState.searchMobile,
    }))
  }

  render() {
    const {searchInput, hamDisplay, searchMobile} = this.state
    const displayNavItems = hamDisplay ? 'displayHam' : 'NotDisplay'
    const displaySearchMobile = searchMobile ? 'displayHam' : 'NotDisplay'
    console.log(searchInput)
    return (
      <SearchContext.Consumer>
        {value => {
          console.log(value)
          const {onStartSearch} = value
          const startSearch = () => {
            onStartSearch(searchInput)
            const {history} = this.props
            console.log(history)
            history.replace('/search-results')
          }
          return (
            <div>
              <div className="headerCont">
                <div className="headerLogo">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686400236/Standard_Collection_8_1_hkcgue.png"
                      alt="website logo"
                      className="websitelogo"
                    />
                  </Link>
                  <h1 className="headerHead">Insta Share</h1>
                </div>
                <div id="deskView">
                  <nav className="searchNavCont">
                    <div className="searchCont">
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearch}
                        className="searchInput"
                        placeholder="Search Caption"
                      />
                      <button
                        type="button"
                        onClick={startSearch}
                        testid="searchIcon"
                      >
                        <FaSearch className="searchIcon" />
                      </button>
                    </div>
                    <nav className="navList1">
                      <ul className="navList">
                        <li className="navItem">
                          <Link to="/">
                            <p>Home</p>
                          </Link>
                        </li>
                        <li className="navItem">
                          <Link to="/my-profile">
                            <p>Profile</p>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    <button
                      type="button"
                      className="logoutBtn"
                      onClick={this.onLogout}
                    >
                      Logout
                    </button>
                  </nav>
                </div>
                <button type="button" onClick={this.onToggleBurger}>
                  <img
                    src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1687006608/menu_3x_1_njlhfx.png"
                    alt="hamburger"
                    className="hamIcon mobileHead"
                    id="mobileHead"
                  />
                </button>
              </div>
              <nav
                className={`searchNavCont mobileHead ${displayNavItems}`}
                id="mobileViewNavItems"
              >
                <div className="searchCont">
                  <p onClick={this.onToggleSearchMobile}>Search</p>
                </div>
                <nav className="navList1">
                  <ul className="navList">
                    <li className="navItem">
                      <Link to="/">
                        <p>Home</p>
                      </Link>
                    </li>
                    <li className="navItem">
                      <Link to="/my-profile">
                        <p>Profile</p>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <button
                  type="button"
                  className="logoutBtn"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
                <AiFillCloseCircle onClick={this.onToggleBurger} />
              </nav>
              <div className={`${displaySearchMobile} mobileSearch`}>
                <input
                  type="search"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                  className={`searchInput ${displaySearchMobile}`}
                  placeholder="Search Caption"
                />
                <button
                  type="button"
                  onClick={startSearch}
                  className={displaySearchMobile}
                  testid="searchIcon"
                >
                  <FaSearch className="searchIcon" />
                </button>
              </div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
