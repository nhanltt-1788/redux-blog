import Header from '../components/Header'
import {connect} from 'react-redux'
import {deletePost, showConfirmModal, hideConfirmModal} from '../actions/post'

const mapStateToProps = (state, ownProps) => {
  
  return {
    isShowing: state.PostReducer.deletePost.isShowing,
    type: ownProps.type,
    postId: ownProps.postId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDeletePost: (id) => {
      dispatch(deletePost(id));
    },
    dispatchShowConfirmModal: () => {
      dispatch(showConfirmModal())
    },
    dispatchHideConfirmModal: () => {
      dispatch(hideConfirmModal())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
