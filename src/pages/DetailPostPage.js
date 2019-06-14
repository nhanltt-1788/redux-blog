import React, { Component } from 'react'
import DetailPostContainer from '../containers/DetailPostContainer';
import HeaderContainer from '../containers/HeaderContainer'
import {
  DETAIL_POST_HEADER
} from '../constants/index'

class DetailPostPage extends Component {

  render() {
    return (
      <div className="container">
        <HeaderContainer
          type={DETAIL_POST_HEADER}
          postId={this.props.match.params.id}
          />
        <DetailPostContainer id={this.props.match.params.id}/>
      </div>
    )
  }
}

export default DetailPostPage
