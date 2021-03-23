import gtyClient from "./gtyClient";

const signin = (email, password) =>
  gtyClient.post(
    "/Token",
    "grant_type=password&username=" + email + "&password=" + password
  );
// const signout = (AccessToken) =>
//   cognitoClient.post("/signout", { AccessToken });
const signup = (name, email, password, phone_number) =>
  cognitoClient.post("/signup", { name, email, password, phone_number });
const confirmsignup = (email, password, code) =>
  cognitoClient.post("/confirm-signup", { email, password, code });

const forgotpassword = (email) =>
  cognitoClient.post("/forgot-password", { email });
const confirmforgotpassword = (email, code, proposed_password) =>
  cognitoClient.post("/confirm-forgot-password", {
    email,
    code,
    proposed_password,
  });

export default {
  signin,
  // signout,
  signup,
  confirmsignup,
  forgotpassword,
  confirmforgotpassword,
};
