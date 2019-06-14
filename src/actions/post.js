import * as type from '../constants/index'

// close message
export function closeMessage() {
  return {
    type: type.CLOSE_MESSAGE
  }
}
// update pagination
export function updateCurrentPage(currentPage) {
  return {
    type: type.UPDATE_CURRENT_PAGE,
    currentPage: currentPage
  }
}

export function updatePostPerPage(number) {
  return {
    type: type.UPDATE_POST_PER_PAGE,
    postPerPage: number
  }
}

// sort title
export function sortTitle() {
  return {
    type: type.SORT_TITLE
  }
}
// reset form errors
export function resetFormErrors() {
  return {
    type: type.RESET_FORM_ERRORS
  }
}
// confirm modal
export function showConfirmModal(id) {
  return {
    type: type.SHOW_MODAL,
    id: id
  }
}

export function hideConfirmModal() {
  return {
    type: type.HIDE_MODAL
  }
}
// search
export function search(keyword) {
  return {
    type: type.SEARCH,
    keyword: keyword
  }
}

export function updateSearchResult() {
  return {
    type: type.UPDATE_SEARCH_RESULT
  }
}
// Post List
export function postsHasErrored(hasErr) {
  return {
    type: type.FETCH_POSTS_FAILURE,
    hasErr: hasErr
  }
}

export function postsIsLoading(isLoading) {
  return {
    type: type.FETCH_POSTS_LOADING,
    isLoading: isLoading
  }
}

export function postsFetchSuccess(posts) {
  return {
    type: type.FETCH_POSTS_SUCCESS,
    posts: posts
  }
}

export function postsFetchData() {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    fetch(type.API_URL)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(postsIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((posts) => {
        dispatch(postsFetchSuccess(posts))
        dispatch(updateSearchResult())
      })
      .catch(() => dispatch(postsHasErrored(true)));
  }
}

export function updatePostList() {
  return {
    type: type.UPDATE_POST_LIST
  }
}
// Post detail
export function postIsLoading(isLoading) {
  return {
    type: type.FETCH_POST_LOADING,
    isLoading: isLoading
  }
}

export function postHasErrored(hasError) {
  return {
    type: type.FETCH_POST_FAILURE,
    hasError: hasError
  }
}

export function postFetchSuccess(post) {
  return {
    type: type.FETCH_POST_SUCCESS,
    post: post
  }
}

export function postFetchData(id) {
  const url = `${type.API_URL}/${id}`

  return (dispatch) => {
    dispatch(postIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(postIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((post) => {
        dispatch(postFetchSuccess(post))
        dispatch(updateSearchResult())
      })
      .catch(() => dispatch(postHasErrored(true)));
  }
}

export function resetActivePost() {
  return {
    type: type.RESET_ACTIVE_POST
  }
}

// new post
export function validateFormError(errors) {
  return {
    type: type.VALIDATE_FORM_ERROR,
    errors: errors
  }
}

export function createPostSuccess(post) {
  return {
    type: type.CREATE_POST_SUCCESS,
    post: post,
    message: type.ADD_SUCCESS_MASSAGE
  }
}

export function createPostFailure(hasError) {
  return {
    type: type.CREATE_POST_FAILURE,
    hasError: hasError
  }
}

export function createPost(post) {
  return (dispatch) => {
    fetch(type.API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        categories: post.categories,
        content: post.content,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(createPostSuccess(data));
        dispatch(updateSearchResult())
        setTimeout(() => {
          dispatch(closeMessage());
        }, 4000);
      })
      .catch((err) => dispatch(createPostFailure(err)))
  }
}
// edit post
export function editPostSuccess(id, post) {
  return {
    type: type.EDIT_POST_SUCCESS,
    id: id,
    postUpdate: post,
    message: type.EDIT_SUCCESS_MASSAGE
  }
}

export function editPost(id, post) {
  const path = `${type.API_URL}/${id}`

  return (dispatch) => {
    fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(editPostSuccess(id, data));
        dispatch(updateSearchResult());
        setTimeout(() => {
          dispatch(closeMessage());
        }, 4000);
      })
      .catch((err) => dispatch(editPostFailure(err)))
  }
}

export function editPostFailure(hasError) {
  return {
    type: type.CREATE_POST_FAILURE,
    hasError: hasError
  }
}
// delete post
export function deletePostFailure(hasError) {
  return {
    type: type.DELETE_POST_FAILURE,
    hasError: hasError
  }
}

export function deletePostSuccess(id, isSuccess) {
  return {
    type: type.DELETE_POST_SUCCESS,
    id: id,
    isSuccess: isSuccess,
    message: type.DELETE_SUCCESS_MASSAGE
  }
}

export function deletePost(id) {
  const path = `${type.API_URL}/${id}`
  return (dispatch) => {
    fetch(path, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        if (!response.error) {
          dispatch(deletePostSuccess(id, true));
          dispatch(updateSearchResult());
          setTimeout(() => {
            dispatch(closeMessage());
          }, 4000);
        } else {
          dispatch(deletePostFailure(true));
        }
      })
  }
}
