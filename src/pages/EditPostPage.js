import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer'
import EditPostContainer from '../containers/EditPostContainer'
import {
  NEW_POST_HEADER
} from '../constants/index'
class EditPostPage extends Component {
  render() {
    return (
      <div className='container'>
        <HeaderContainer type={NEW_POST_HEADER} />
        <EditPostContainer id={this.props.match.params.id}/>
      </div>
    )
  }
}

export default EditPostPage
