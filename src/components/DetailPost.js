import React, { Component } from 'react'

class DetailPost extends Component {

  componentDidMount() {
    const { postId } = this.props;
    this.props.dispatchFetchPostData(postId);
  }

  renderDetailPost = () => {
    const { post, isLoading, hasError} = this.props;
    if (isLoading) {
      return (
        <span>Loading...</span>
      )
    }

    if (hasError) {
      return (
        <span>Error...</span>
      )
    }

    return (
      <div className='detail-post'>
        <h2>{post.title}</h2>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }

  render() {


    return (
      <div>
        {this.renderDetailPost()}
      </div>
    )
  }
}

export default DetailPost
