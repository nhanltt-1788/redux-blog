import {connect} from 'react-redux'
import PostForm from '../components/PostForm'
import {validateFormError, createPost, resetFormErrors} from '../actions/post'

const mapStateToProps = (state) => {

  return {
    errors: state.PostReducer.formErrors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchValidateForm: (errors) => {
      dispatch(validateFormError(errors))
    },
    dispatchCreatePost: (post) => {
      dispatch(createPost(post))
    },
    dispatchResetFormErrors: () => {
      dispatch(resetFormErrors())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
