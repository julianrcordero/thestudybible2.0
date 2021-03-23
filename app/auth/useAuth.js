import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import cognitoAuthApi from "../api/cognitoAuth";
import gtyAuthApi from "../api/gtyAuth"; //for auth

import gtyClient from "../api/gtyClient"; //for get
import useApi from "../hooks/useApi";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");

  const logIn = (data) => {
    const user = jwtDecode(data.access_token);
    //add to user json here

    const userToSet = {
      ...user,
      email: data.email,
      password: "Placeholder",
      name: data.first + " " + data.last,
      phone: "",
    };

    setUser(userToSet);
    authStorage.storeAccessToken(data.access_token);
  };

  const logOut = async () => {
    const accessToken = await authStorage.getAccessToken();

    setUser(null);
    authStorage.removeAccessToken();
  };

  return { user, logIn, logOut };
};

// export default useAuth = () => {
//   const { user, setUser } = useContext(AuthContext);

//   const logIn = (idToken, accessToken) => {
//     const user = jwtDecode(idToken);
//     setUser(user);
//     console.log(user);
//     authStorage.storeAccessToken(accessToken);
//     authStorage.storeIdToken(idToken);
//   };

//   const logOut = async () => {
//     const accessToken = await authStorage.getAccessToken();
//     const result = await cognitoAuthApi.signout(accessToken);
//     result.ok
//       ? console.log("Successfully signed out via Cognito")
//       : console.log("Couldn't sign out via Cognito");

//     setUser(null);
//     authStorage.removeIdToken();
//     authStorage.removeAccessToken();
//   };

//   return { user, logIn, logOut };
// };
