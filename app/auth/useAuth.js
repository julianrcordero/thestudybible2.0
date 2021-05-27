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
      const result = await userMarkupApi.getUserMarkup(
        user.sub
        //     ,(progress) => setProgress(progress)
      );

      if (result.ok) {
        return result.data;
      } else return alert("Could not retrieve user markup");
    } else {
    }
  };

  return { user, getUserMarkup, logIn, logOut };
};
