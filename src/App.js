import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import DetailPostPage from './pages/DetailPostPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={PostsListPage} />
        <Route path="/post/:id" component={DetailPostPage} />
        <Route path="/new" component={NewPostPage} />
        <Route path="/edit/:id" component={EditPostPage} />
      </BrowserRouter>
    )
  }
}

export default App
