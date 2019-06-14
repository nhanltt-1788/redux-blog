import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class EditForm extends Component {

  componentDidMount() {
    this.props.dispatchResetFormErrors()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postId, dispatchValidateForm, dispatchEditPost} = this.props;
    const title = this.getTitle.value;
    const categories = this.getCategories.value;
    const content = this.getContent.value;
    const editPost = {
      title: title,
      categories: categories,
      content: content
    }

    const errors = this.validateForm(editPost);

    if (errors.length > 0) {
      dispatchValidateForm(errors);
    }
    else {
      dispatchEditPost(postId, editPost);
      this.props.history.push(`/`);
    }
  }

  validateForm = (editPost) => {
    const errors = [];

    if (!editPost.title || editPost.title.trim === '') {
      errors.push("Enter a Title");
    }

    if (!editPost.categories || editPost.categories.trim === '') {
      errors.push("Enter Category")
    }

    if (!editPost.content || editPost.content.trim === '') {
      errors.push("Enter Content")
    }

    return errors;
  }

  getPostById = (id) => {
    const { posts } = this.props;
    const post = posts.filter(post => post.id === id);
    return post;
  }

  renderErrors = (errors) => {
    if (errors.length > 0) {
      return (
        <div className="alert alert-danger">
          <ul>
            {
              errors.map((error, index) => {
                return (
                  <li key={index}>{error}</li>
                )
              })
            }
          </ul>
        </div>
      )
    }
    else return null
  }

  renderForm = () => {
    const { postId } = this.props;
    const post = this.getPostById(postId);

    if (typeof(post[0]) !== 'undefined') {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="iTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="iTitle"
              placeholder="Ex: Title"
              defaultValue={post[0].title}
              ref={(input) => this.getTitle = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="iCategories">Categories</label>
            <input
              type="text"
              className="form-control"
              id="iCategories"
              placeholder="Ex: Categories"
              defaultValue={post[0].categories}
              ref={(input) => this.getCategories = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taContent">Contend</label>
            <textarea
              className="form-control"
              id="taContent"
              rows="3"
              defaultValue={post[0].content}
              ref={(input) => this.getContent = input}
            ></textarea>
          </div>
          <button className="btn btn-light mr-3">Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )
    }

  }

  render() {
    return (
      <div className='edit-form'>
        { this.renderErrors(this.props.errors) }
        { this.renderForm() }
      </div>
    )
  }
}

export default withRouter(EditForm)
