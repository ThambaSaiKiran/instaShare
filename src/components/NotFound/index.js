import './index.css'

const NotFound = props => {
  const onRedirectHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notFoundCont">
      <img
        src="https://res.cloudinary.com/di2h4lbw2/image/upload/v1686643118/erroring_1_2x_1_lkprnn.png"
        alt="page not found"
        className="notFoundImg"
      />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        type="button"
        onClick={onRedirectHome}
        className="homeRedirectBtn"
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
