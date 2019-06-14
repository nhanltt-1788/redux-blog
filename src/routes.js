import React from 'react';
import {BrowserRouter as Router, Route, IndexRoute } from 'react-router';
import PostsListPage from './pages/PostsListPage';
import DetailPostPage from './pages/DetailPostPage';

export default (
  <Router>
    <IndexRoute component={PostsListPage}/>
    <Route path="post/`:id`" component={DetailPostPage} />
  </Router>
);
