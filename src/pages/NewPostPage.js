import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer'
import NewPostContainer from '../containers/NewPostContainer'
import { NEW_POST_HEADER } from '../constants/index'

class NewPostPage extends Component {
  render() {
    return (
      <div className='container'>
        <HeaderContainer type={NEW_POST_HEADER} />
        <NewPostContainer />
      </div>
    )
  }
}

export default NewPostPage
