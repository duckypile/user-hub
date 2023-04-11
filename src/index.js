import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';

import {
  Header,
  UserPosts,
  UserTodos
} from './components';

import {
  getUsers,
  getPostsByUser,
  getTodosByUser
} from './api';

import {
  getCurrentUser
} from './auth';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        // something something errors
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      setUserTodos([]);
      return;
    }

    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        // something something errors
      });

    getTodosByUser(currentUser.id)
      .then(todos => {
        setUserTodos(todos);
      })
      .catch(error => {
        // something something errors
      });
  }, [currentUser]);

  return (
    <Router>
      <div id="App">
        <Header
          userList={ userList }
          currentUser={ currentUser }
          setCurrentUser={ setCurrentUser } />
        {
          currentUser
          ? <>
          <Routes>
                <Route path="/posts" element={
                  <UserPosts
                    userPosts={ userPosts }
                    currentUser={ currentUser } />}
                />
                <Route path="/todos" element={
                  <UserTodos
                    userTodos={ userTodos }
                    currentUser={ currentUser } />}
                />
                <Route path="/" element={
                  <h2 style={{
                    padding: ".5em"
                  }}>Welcome, { currentUser.username }!</h2>}
                />
                {/* <Redirect to="/" /> */}
                </Routes >
            </>
          : <>
          <Routes>
                <Route path="/" element={
                  <h2 style={{
                    padding: ".5em"
                  }}>Please log in, above.</h2>}
                />
                {/* <Redirect to="/" /> */}
                </Routes>
            </>
        }
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
