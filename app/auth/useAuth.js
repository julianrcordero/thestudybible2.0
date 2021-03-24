import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

import userMarkupApi from "../api/userMarkup";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userMarkup, setUserMarkup] = useState();

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

    getUserMarkup(user);
  };

  const logOut = async () => {
    setUser(null);
    authStorage.removeAccessToken();
  };

  const getUserMarkup = async (user) => {
    if (user) {
      console.log("Get user info for ", user.sub);
      const result = await userMarkupApi.getUserMarkup(
        user.sub
        //     ,(progress) => setProgress(progress)
      );

      if (result.ok) {
        console.log("result is ok");
        return result.data;
      } else return alert("Could not retrieve user markup");
    } else {
      console.log("No user to retrieve info for");
    }
  };

  return { user, getUserMarkup, logIn, logOut };
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
