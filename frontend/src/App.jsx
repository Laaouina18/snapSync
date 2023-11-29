import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/redux/store";
import Layout from "./layouts/layout";
import Posts from "./pages/Posts";
import Auth from "./pages/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Posts />} />
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

function App() {
  return (
    <GoogleOAuthProvider clientId="179020421259-lcg0frh4ndoaf49ukcjbmggaciimde7d.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
