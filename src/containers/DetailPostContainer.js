import {connect} from 'react-redux'
import DetailPost from '../components/DetailPost'
import {postFetchData} from '../actions/post'

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.PostReducer.detailPost.post,
    isLoading: state.PostReducer.detailPost.isLoading,
    hasError: state.PostReducer.detailPost.hasError,
    postId: ownProps.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchFetchPostData: () => {
      dispatch(postFetchData(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)
