import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class NewPost extends Component {

  componentDidMount() {
    this.props.dispatchResetFormErrors()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatchValidateForm, dispatchCreatePost} = this.props;
    const title = this.getTitle.value;
    const categories = this.getCategories.value;
    const content = this.getContent.value;
    const newPost = {
      title: title,
      categories: categories,
      content: content
    }

    const errors = this.validateForm(newPost);
    
    if(errors.length > 0) {
      dispatchValidateForm(errors);
    }
    else {
      dispatchCreatePost(newPost);
      this.resetForm();
      this.props.history.push(`/`);
    }
  }

  resetForm = () =>  {
    this.getTitle.value = '';
    this.getCategories.value = '';
    this.getContent.value = '';
  }

  validateForm = (newPost) => {
    const errors = [];

    if (!newPost.title || newPost.title.trim === '') {
      errors.push("Enter a Title");
    }

    if (!newPost.categories || newPost.categories.trim === '') {
      errors.push("Enter Category")
    }

    if (!newPost.content || newPost.content.trim === '') {
      errors.push("Enter Content")
    }

    return errors;
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

  render() {
    return (
      <div className='new-post'>
        {this.renderErrors(this.props.errors)}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="iTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="iTitle"
              placeholder="Ex: Title"
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
              ref={(input) => this.getCategories = input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taContent">Content</label>
            <textarea
              className="form-control"
              id="taContent"
              rows="3"
              ref={(input) => this.getContent = input}
            ></textarea>
          </div>
          <button type="reset" className="btn btn-light mr-3">Reset</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(NewPost)
