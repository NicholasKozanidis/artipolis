import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profile/EditProfile';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PostForm from './components/posts/PostForm';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.scss';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { LOGOUT } from './actions/types';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import ProfileCurrent from './components/profile/ProfileCurrent';
import ProfileAlias from './components/profile/ProfileAlias';
import Gallery from './components/posts/Gallery';
import SearchBar from './components/posts/SearchBar';

const App = () => {
  useEffect(() => {
    // check for token in LS and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/search' component={SearchBar} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/me' component={ProfileCurrent} />

              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/posts' component={Gallery} />
              <Route exact path='/posts/:id' component={Post} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/upload' component={PostForm} />
              <Route exact path='/:alias' component={ProfileAlias} />
              <Route exact path='/:alias/liked' component={ProfileAlias} />
              <Route exact path='/:alias/following' component={ProfileAlias} />
              <Route exact path='/:alias/followers' component={ProfileAlias} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
