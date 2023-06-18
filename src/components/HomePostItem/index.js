import {Component} from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

class HomePostItem extends Component {
  state = {isLiked: false}

  onClickUser = () => {
    const {item, onClickUserName} = this.props
    onClickUserName(item.user_id)
  }

  onToggleLike = async () => {
    await this.setState(prevState => ({isLiked: !prevState.isLiked}))
    const {item, onClickUserName} = this.props
    const {isLiked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const likedRequestBody = {
      like_status: isLiked,
    }
    const postLikeAPI = `https://apis.ccbp.in/insta-share/posts/${item.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likedRequestBody),
    }
    const response = await fetch(postLikeAPI, options)
    const responseBody = await response.json()
    console.log(responseBody)
  }

  getLikeCount = () => {
    const {item} = this.props
    const {isLiked} = this.state
    if (isLiked) {
      return item.likes_count + 1
    }
    return item.likes_count
  }

  render() {
    const {item, onClickUserName} = this.props
    const {isLiked} = this.state
    const likeCount = this.getLikeCount()
    return (
      <div className="postItem1" testid="postItem">
        <div className="postLogoCont">
          <img
            src={item.profile_pic}
            alt="post author profile"
            className="postLogo"
          />
          <p className="postedUser" onClick={this.onClickUser}>
            {item.user_name}
          </p>
        </div>
        <img src={item.post_details.image_url} alt="post" className="postImg" />
        <div className="postContentCont">
          <div className="likeCommentCont">
            {!isLiked ? (
              <button
                type="button"
                onClick={this.onToggleLike}
                className="userPostBtn"
                testid="likeIcon"
              >
                <BsHeart className="liked" size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={this.onToggleLike}
                className="userPostBtn"
                testid="unLikeIcon"
              >
                <BsHeartFill className="liked" color="red" size={20} />
              </button>
            )}
            <button type="button" className="userPostBtn">
              <FaRegComment size={20} />
            </button>
            <button type="button" className="userPostBtn">
              <BiShareAlt size={20} />
            </button>
          </div>
          <p className="likes">{likeCount} likes</p>
          <p>{item.post_details.caption}</p>
          <ul className="commentList">
            {item.comments.map(eachItem => (
              <li className="commentItem" key={eachItem.user_id}>
                <p>
                  <span className="commentedUser">{eachItem.user_name}</span>
                  {eachItem.comment}
                </p>
              </li>
            ))}
          </ul>
          <p>{item.created_at}</p>
        </div>
      </div>
    )
  }
}

export default HomePostItem
