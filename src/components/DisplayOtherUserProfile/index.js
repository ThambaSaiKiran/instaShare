import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const DisplayOtherUserProfile = props => {
  const {item} = props
  return (
    <div className="profCont">
      <p className="mobileViewUserName">{item.user_name}</p>
      <div className="profDetCont">
        <img
          src={item.profile_pic}
          alt="user profile"
          className="profilePicImg"
        />
        <div>
          <h1>{item.user_name}</h1>
          <div className="profDet">
            <p>{item.posts_count} posts</p>
            <p>{item.followers_count} followers</p>
            <p>{item.following_count} following</p>
          </div>
          <div>
            <p>{item.user_id}</p>
            <p>{item.user_bio}</p>
          </div>
        </div>
      </div>
      <div className="myProfileMobileView">
        <div className="mobileViewProfileDet">
          <img
            src={item.profile_pic}
            alt="user profile"
            className="profilePicImg"
          />
          <div>
            <p className="mobilePostNumbers">{item.posts_count}</p>
            <p>posts</p>
          </div>
          <div>
            <p className="mobilePostNumbers">{item.followers_count}</p>
            <p>followers</p>
          </div>
          <div>
            <p className="mobilePostNumbers">{item.following_count}</p>
            <p>following</p>
          </div>
        </div>
        <div>
          <p>{item.user_id}</p>
          <p>{item.user_bio}</p>
        </div>
      </div>
      <div>
        <ul className="storiesList">
          {item.stories.map(eachItem => (
            <li key={eachItem.id} className="storyItem">
              <img src={eachItem.image} alt="user story" className="story" />
            </li>
          ))}
        </ul>
      </div>
      <hr className="horLine" />>
      <div className="postLogoCont">
        <BsGrid3X3 />
        <h1>Posts</h1>
      </div>
      <div>
        {item.posts.length === 0 ? (
          <div>
            <div className="camera">
              <BiCamera />
            </div>
            <h1>No Posts</h1>
          </div>
        ) : (
          <ul className="postsList">
            {item.posts.map(eachItem => (
              <li key={eachItem.id} className="postItem">
                <img
                  src={eachItem.image}
                  alt="user post"
                  className="userPosts"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default DisplayOtherUserProfile
