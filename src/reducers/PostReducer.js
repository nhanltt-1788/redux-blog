import * as type from '../constants/index'

const initialState = {
  postList: {
    posts: [],
    isLoading: false,
    hasError: false
  },
  newPost: {
    post: {},
    hasError: null,
    loading: false
  },
  editPost: {
    id: -1,
    postUpdate: {},
    isLoading: false
  },
  detailPost: {
    post: [],
    isLoading: false,
    hasError: false
  },
  deletePost: {
    id: -1,
    hasError: false,
    isSucces: false,
    isShowing: false
  },
  pagination: {
    currentPage: 1,
    postPerPage: 10,
    isPreBtnDisable: true,
    isNextBtnDisable: false
  },
  search: {
    keyword: '',
  },
  sort: {
    type: false
  },
  dataDisplay: {
    postList: []
  },
  formErrors: [],
  successMessage: ''

};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RESET_FORM_ERRORS:
      return {
        ...state,
        formErrors: []
      }
    case type.CLOSE_MESSAGE:
      return {
        ...state,
        successMessage: ''
      }
    case type.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.currentPage
        }
      }
    case type.UPDATE_POST_PER_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          postPerPage: action.postPerPage
        }
      }
    case type.VALIDATE_FORM_ERROR:
      return {
        ...state,
        formErrors: action.errors
      }
    case type.SEARCH:
      const keyword = action.keyword;
      return {
        ...state,
        search: {
          ...state.search,
          keyword: action.keyword
        },
        dataDisplay: {
          ...state.dataDisplay,
          postList: keyword ? state.postList.posts.filter((post) => post.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) : state.postList.posts
        },
        pagination: {
          ...state.pagination,
          currentPage: 1
        }
      }
    case type.UPDATE_SEARCH_RESULT:
      return {
        ...state,
        dataDisplay: {
          ...state.search,
          postList: state.postList.posts
        }
      }
    case type.SORT_TITLE:
      const sortType = !state.sort.type;

      const sortIncrease = (a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      }

      const sortDecrease = (a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0;
      }

      return {
        ...state,
        sort: {
          ...state.sort,
          type: sortType
        },
        dataDisplay: {
          ...state.dataDisplay,
          postList: state.dataDisplay.postList.length > 0
            ? (sortType ? [...state.dataDisplay.postList.sort((a, b) => sortIncrease(a, b))] : [...state.dataDisplay.postList.sort((a, b) => sortDecrease(a, b))])
            : state.dataDisplay.postList
        }
      }
    case type.CREATE_POST:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          post: action.post
        }
      }
    case type.CREATE_POST_SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          posts: [...state.postList.posts, action.post]
        },
        successMessage: action.message
      }
    case type.CREATE_POST_FAILURE:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          hasError: action.hasError
        }
      }
    case type.EDIT_POST_LOADING:
      return {
        ...state,
        editPost: {
          ...state.editPost,
          isLoading: action.isLoading
        }
      }
    case type.EDIT_POST_SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          posts: state.postList.posts.map(post => {
            if (post.id === action.id) {
              return {
                ...post,
                title: action.postUpdate.title,
                categories: action.postUpdate.categories,
                content: action.postUpdate.content
              }
            }
            else return post
          })
        },
        successMessage: action.message
      }
    case type.FETCH_POST_LOADING:
      return {
        ...state,
        detailPost: {
          ...state.detailPost,
          isLoading: action.isLoading
        }
      }
    case type.FETCH_POST_FAILURE:
      return {
        ...state,
        detailPost: {
          ...state.detailPost,
          hasError: action.hasError
        }
      }
    case type.FETCH_POST_SUCCESS:
      return {
        ...state,
        detailPost: {
          ...state.detailPost,
          post: action.post
        }
      }
    case type.DELETE_POST_SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          posts: state.postList.posts.filter(post => post.id !== action.id)
        },
        deletePost: {
          ...state.deletePost,
          isSucces: action.isSucces
        },
        successMessage: action.message
      }
    case type.DELETE_POST_FAILURE:
      return {
        ...state,
        deletePost: {
          ...state.deletePost,
          hasError: action.hasError
        }
      }
    case type.SHOW_MODAL:
      return {
        ...state,
        deletePost: {
          ...state.deletePost,
          isShowing: true,
          id: action.id
        }
      }
    case type.HIDE_MODAL:
      return {
        ...state,
        deletePost: {
          ...state.deletePost,
          isShowing: false
        }
      }
    case type.FETCH_POSTS_LOADING:
      return {
        ...state,
        postList: {
          ...state.postList,
          isLoading: action.isLoading,
        }
      }
    case type.FETCH_POSTS_FAILURE:
      return {
        ...state,
        postList: {
          ...state.postList,
          hasError: action.hasErr
        }
      }
    case type.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          posts: action.posts,
        },
        search: {
          ...state.search,
          postList: action.posts
        }
      }
    case type.UPDATE_POST_LIST:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default PostReducer;
