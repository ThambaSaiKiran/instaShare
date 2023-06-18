import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import SearchContext from './context/searchContext'
import SearchResults from './components/SearchResults'
import './App.css'

class App extends Component {
  state = {searchText: ''}

  redirectSearch = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/search-results')
  }

  onStartSearch = searchedText => {
    this.setState({searchText: searchedText})
  }

  render() {
    const {searchText} = this.state
    console.log(searchText)
    localStorage.setItem('searchText', searchText)
    return (
      <SearchContext.Provider
        value={{searchText, onStartSearch: this.onStartSearch}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route exact path="/search-results" component={SearchResults} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
