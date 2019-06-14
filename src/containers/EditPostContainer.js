import {connect} from 'react-redux'
import EditForm from '../components/EditForm'
import {validateFormError, editPost, resetFormErrors} from '../actions/post'

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.PostReducer.postList.posts,
    errors: state.PostReducer.formErrors,
    postId: ownProps.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchValidateForm: (errors) => {
      dispatch(validateFormError(errors))
    },
    dispatchEditPost: (id, post) => {
      dispatch(editPost(id, post))
    },
    dispatchResetFormErrors: () => {
      dispatch(resetFormErrors())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)
