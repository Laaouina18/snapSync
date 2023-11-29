// GoogleAuthComponent.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

function GoogleAuthComponent({ onGoogleLogin }) {
  const responseGoogle = (response) => {
    // Handle the Google response here
    console.log(response);
    // Call the onGoogleLogin function with the Google response
    onGoogleLogin(response);
  };

  return (
    <GoogleLogin
      clientId="179020421259-lcg0frh4ndoaf49ukcjbmggaciimde7d.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleAuthComponent;
