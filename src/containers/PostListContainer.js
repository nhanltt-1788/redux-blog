import PostList from '../components/PostList'
import {connect} from 'react-redux'
import {
  postsFetchData,
  hideConfirmModal,
  deletePost,
  showConfirmModal,
  updateCurrentPage,
  updatePostPerPage,
  search,
  sortTitle
} from '../actions/post'

const mapStateToProps = (state) => {
  return {
    posts: state.PostReducer.dataDisplay.postList,
    isLoading: state.PostReducer.postList.isLoading,
    hasError: state.PostReducer.postList.hasError,
    isShowing: state.PostReducer.deletePost.isShowing,
    deletedPostId: state.PostReducer.deletePost.id,
    successMessage: state.PostReducer.successMessage,
    currentPage: state.PostReducer.pagination.currentPage,
    postPerPage: state.PostReducer.pagination.postPerPage,
    isPreBtnDisable: state.PostReducer.pagination.isPreBtnDisable,
    isNextBtnDisable: state.PostReducer.pagination.isNextBtnDisable,
    keyword: state.PostReducer.keyword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchPostListData: () => dispatch(postsFetchData()),
    dispatchHideConfirmModal: () => dispatch(hideConfirmModal()),
    dispatchDeletePost: (id) => {dispatch(deletePost(id))},
    dispatchShowConfirmModal: (id) => {dispatch(showConfirmModal(id))},
    dispatchUpdateActivePage: (currentPage) => {dispatch(updateCurrentPage(currentPage))},
    dispatchUpdatePostPerPage: (number) => {dispatch(updatePostPerPage(number))},
    dispatchSearch: (keyword) => {dispatch(search(keyword))},
    dispatchSortTitle: () => {dispatch(sortTitle())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
