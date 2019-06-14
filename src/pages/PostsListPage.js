import React, { Component } from 'react'
import PostListContainer from '../containers/PostListContainer';
import HeaderContainer from '../containers/HeaderContainer'
import { POST_LIST_HEADER } from '../constants/index'

class PostsListPage extends Component {
  render() {
    return (
      <div className="container">
        <HeaderContainer type={POST_LIST_HEADER} />
        <PostListContainer />
      </div>
    )
  }
}

export default PostsListPage
