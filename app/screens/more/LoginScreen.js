import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

import TextInput from "../../components/TextInput";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import cognitoAuthApi from "../../api/cognitoAuth";

import { useTheme } from "../../config/ThemeProvider";

import { Formik } from "formik";
import useAuth from "../../auth/useAuth";
import AppText from "../../components/Text";

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await cognitoAuthApi.signin(email, password);

    // console.log(result);
    if (!result.ok) {
      if (result.data) setLoginFailed(result.data.message);
      else {
        setLoginFailed("An unexpected error occurred.");
      }
      return;
    } else if (result.data.statusCode !== 200) {
      return setLoginFailed(result.data.body.message);
    } else {
      setLoginFailed(false);
      auth.logIn(
        result.data.body.data.AuthenticationResult.IdToken,
        result.data.body.data.AuthenticationResult.AccessToken
      );
      // navigation.navigate("More");
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      // flex: 1,
      paddingVertical: 10,
    },
    logo: {
      width: 80,
      height: 80,
      alignSelf: "center",
      marginTop: 50,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Image style={styles.logo} source={require("../../assets/gtylogo.jpg")} /> */}
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={loginFailed} visible={loginFailed} />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <View
          style={{
            backgroundColor: "green",
            flexDirection: "row",
            paddingVertical: 15,
          }}
        >
          {/* <Button
            // style={{ width: 40 }}
            a
            title={"Forgot Password"}
            onPress={() => navigation.navigate("ForgotPassword")}
          ></Button> */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <AppText
              style={{
                color: colors.black,
                fontWeight: "bold",
                marginVertical: 5,
                fontSize: 16,
                textDecorationLine: "underline",
                // textAlign: "center",
              }}
            >
              {"Forgot Password?"}
            </AppText>
          </TouchableOpacity>
          <SubmitButton
            title="LOG IN"
            // onPress={() => navigation.navigate("Account")}
          />
        </View>
      </AppForm>
    </View>
  );

  // _login = async () => {
  //   if (
  //     userInfo.email === state.email &&
  //     userInfo.password === state.password
  //   ) {
  //     alert("Logged In");
  //   } else {
  //     alert("Incorrect");
  //   }
  // };
}

export default LoginScreen;

// onSubmit={(values) => {
//   fetch(
//     "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signin",
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         email: values.email,
//         password: values.password,
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.statusCode == 200) {
//         console.log(data.body.message);
//         console.log(data.body.data.AuthenticationResult.AccessToken);
//         navigation.navigate("Account", {
//           AccessToken: data.body.data.AuthenticationResult.AccessToken,
//         });
//       } else {
//         const message = data.body.message;
//         console.log(message);
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }}
