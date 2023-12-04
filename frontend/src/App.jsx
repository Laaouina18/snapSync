import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './services/redux/store';
import Auth from './pages/Auth';
import Posts from './pages/Posts';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  const userExists = localStorage.getItem('User'); 

  return (
    <GoogleOAuthProvider clientId="179020421259-lcg0frh4ndoaf49ukcjbmggaciimde7d.apps.googleusercontent.com">
      <Provider store={store}>
	  <BrowserRouter>
    <Switch>
	<Route path="/auth" exact render={() => (
            userExists ? <Redirect to="/Posts" /> :<Auth/>
          )} />
	<Route path="/Posts" exact render={() => ( <Posts/> 
          )} />
      <Route path="/" exact render={() => ( <Posts/> 
          )} />
    </Switch>
    </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
