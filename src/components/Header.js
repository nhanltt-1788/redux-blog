import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert-react';
import {
  POST_LIST_HEADER,
  DETAIL_POST_HEADER
} from '../constants/index';
import { withRouter } from "react-router-dom";


class Header extends Component {

  handleDeletePost = (id) => {
    this.props.dispatchDeletePost(id)
    this.props.dispatchHideConfirmModal()
    this.props.history.push(`/`)
  }

  renderHeader = (type) => {
    const { postId, dispatchShowConfirmModal, dispatchHideConfirmModal } = this.props;
    switch (type) {
      case POST_LIST_HEADER:
        return (
          <header className='header'>
            <h3>Post List</h3>
            <Link to='/new' className='btn btn-info ml-auto'>New Post</Link>
          </header>
        )
      case DETAIL_POST_HEADER:
        return (
          <header className='header'>
            <Link to='/'>back to index </Link>
            <div className='ml-auto'>
              <Link
                to={"/edit/" + postId}
                className='btn btn-info mr-3'
              >Edit</Link>
              <button
                className='btn btn-danger'
                onClick={() => dispatchShowConfirmModal()}
              >
                Delete Post
            </button>
            </div>
            <SweetAlert
              show={this.props.isShowing}
              text={'Do you want delete???? '}
              title=""
              showCancelButton
              onOutsideClick={() => dispatchHideConfirmModal()}
              onEscapeKey={() => dispatchHideConfirmModal()}
              onCancel={() => dispatchHideConfirmModal()}
              onConfirm={() => this.handleDeletePost(postId)}
            />
          </header>
        )
      default:
        return (
          <header className='header'>
            <Link to='/'>back to index </Link>
          </header>
        )
    }
  }

  render() {
    return (
      <div>
        {this.renderHeader(this.props.type)}
      </div>
    )
  }
}

export default withRouter(Header)
