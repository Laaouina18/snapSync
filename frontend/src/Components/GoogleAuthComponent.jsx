// GoogleAuthComponent.js
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleAuthComponent() {
  const responseMessage = (response) => {
	setUser(response.credential);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse.credential),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
		
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo.profile opined`, {
          headers: {
            Authorization: `Bearer ${user}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const userEmail = res.data.email;
          // Mettez à jour le state profile avec les informations de l'utilisateur
          setProfile(res.data);
          console.log('Adresse e-mail de l\'utilisateur :', userEmail);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        // Affichez un message de bienvenue ou le nom de l'utilisateur ici
        <p>Bienvenue, {profile.name}!</p>
      ) : (
        // Affichez le bouton de connexion Google s'il n'y a pas d'utilisateur connecté
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      )}

      {profile && (
        // Affichez le bouton de déconnexion si un utilisateur est connecté
        <button onClick={logOut}>Déconnexion</button>
      )}
    </div>
  );
}

export default GoogleAuthComponent;
