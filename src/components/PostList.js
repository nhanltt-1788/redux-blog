import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert-react';

class PostList extends Component {

  componentDidMount() {
    this.props.dispatchPostListData()
  }

  handleDeletePost = (id) => {
    this.props.dispatchDeletePost(id);
    this.props.dispatchHideConfirmModal();
  }

  handleClickPage = (e, currentPage) => {
    e.preventDefault();
    this.props.dispatchUpdateActivePage(currentPage)
  }

  handlePostPerPage = (number) => {
    this.props.dispatchUpdatePostPerPage(number);
  }

  handlePrePage = (e) => {
    const {
      currentPage,
      dispatchUpdateActivePage
    } = this.props;

    e.preventDefault();
    if (currentPage > 1) {
      dispatchUpdateActivePage(currentPage - 1);
    }
  }

  handleNextPage = (e) => {
    const {
      posts,
      postPerPage,
      currentPage,
      dispatchUpdateActivePage
    } = this.props;

    e.preventDefault();
    const total = Math.ceil(posts.length / postPerPage);

    if (currentPage < total) {
      dispatchUpdateActivePage(currentPage + 1);
    }
  }

  handleSearch = (keyword) => {
    const { dispatchSearch } = this.props;
    dispatchSearch(keyword);
  }

  handleSort = () => {
    this.props.dispatchSortTitle();
  }

  renderMessage = () => {
    const { successMessage } = this.props;
    return (
      <div className="alert alert-success" role="alert">{successMessage}</div>
    )
  }

  renderModal = () => {
    const { dispatchHideConfirmModal, isShowing, deletedPostId } = this.props;

    return (
      <SweetAlert
        show={isShowing}
        text={'Do you want delete???? '}
        title=""
        showCancelButton
        onOutsideClick={() => dispatchHideConfirmModal()}
        onEscapeKey={() => dispatchHideConfirmModal()}
        onCancel={() => dispatchHideConfirmModal()}
        onConfirm={() => this.handleDeletePost(deletedPostId)}
      />
    )
  }

  renderPosts = () => {
    const { posts, currentPage, postPerPage } = this.props;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return currentPosts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td className='posts-table__title'>
            <Link to={"post/" + post.id}>{post.title}</Link>
          </td>
          <td>{post.categories}</td>
          <td>
            <Link
              to={"/edit/" + post.id}
              className='btn btn-info mr-2'
            >Edit</Link>
            <button
              className='btn btn-danger'
              onClick={() => this.props.dispatchShowConfirmModal(post.id)}
            >
              Delete
                  </button>
          </td>
        </tr>
      )
    })
  }

  renderPageNumbers = () => {
    const { posts, postPerPage, currentPage } = this.props;
    const pageNumbers = [];
    let hrefLink = '#';

    for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number, index) => {
      return (
        <li
          key={index}
          className={number === currentPage ? 'page-item active' : 'page-item'}
        >
          <a
            className='page-link'
            href={hrefLink}
            onClick={(e) => this.handleClickPage(e, number)}
          >
            {number}
          </a>
        </li>
      )
    })
  }

  renderPagination = () => {
    const { currentPage, posts, postPerPage } = this.props;
    const totalPage = Math.ceil(posts.length / postPerPage);
    const hrefLink = '#';

    if(totalPage > 1) {
      return (
        <ul className='pagination'>
          <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
            <a
              className="page-link"
              href={hrefLink}
              aria-label="Previous"
              onClick={this.handlePrePage}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {this.renderPageNumbers()}
          <li className={currentPage === totalPage ? 'page-item disabled' : 'page-item'}>
            <a
              className="page-link"
              href={hrefLink}
              aria-label="Next"
              onClick={this.handleNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      )
    }
    else return
  }

  render() {
    const {
      isLoading,
      hasError,
      deletedPostId,
      successMessage,
    } = this.props;

    if (isLoading) {
      return <span>Loadding...</span>
    }

    if (hasError) {
      return <span>Error</span>
    }

    return (
      <div className='post-list'>
        {(successMessage !== '') && this.renderMessage()}
        {(deletedPostId !== -1) ? this.renderModal() : null}
        <div className='post-list__header'>
          <div className='form-inline'>
            <label>Show
            <select
                className='post-number-filter__select'
                onChange={e => this.handlePostPerPage(e.target.value)}
              >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='40'>40</option>
                <option value='50'>50</option>
              </select>
              <span>entries</span>
            </label>
          </div>
          <div className='form-inline search'>
            <label>Search: </label>
            <input
              type='text'
              className='form-control search__input'
              onChange={(e) => this.handleSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-hover posts-table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>
                <button
                  className='sort-title js-toggle-sort'
                  onClick={this.handleSort} 
                >
                  Post Title
                </button>
              </th>
              <th>Category</th>
              <th>Handle</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPosts()}
          </tbody>
        </table>
        {this.renderPagination()}
      </div>
    )
  }
}

export default PostList
