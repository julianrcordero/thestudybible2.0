import React, { useState } from "react";
import { Button, Image, StyleSheet, View, Alert } from "react-native";
import * as yup from "yup";

import cognitoAuthApi from "../../api/cognitoAuth";
import ActivityIndicator from "../../components/ActivityIndicator";

import {
  AppForm,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import { useTheme } from "../../config/ThemeProvider";

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required()
    .min(6) //test("len", "Code must be 6 digits", (label) => val.length === 5)
    .label("Code"),
  proposed_password: yup.string().required().min(4).label("Phone"),
  confirm_proposed_password: yup
    .string()
    .oneOf([yup.ref("proposed_password"), null], "Passwords must match")
    .required("Password confirm is required"),
});

function ResetPasswordScreen({ route, navigation }) {
  const { colors, isDark } = useTheme();
  const { email } = route.params;
  const confirmforgotpasswordApi = useApi(cognitoAuthApi.confirmforgotpassword);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ email, code, proposed_password }) => {
    const result = await confirmforgotpasswordApi.cognitorequest(
      email,
      code,
      proposed_password
    );

    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    } else if (result.data.statusCode !== 200) {
      setError(result.data.body.message);
      return;
    }

    const result2 = await cognitoAuthApi.signin(email, proposed_password);
    auth.logIn(
      result2.data.body.data.AuthenticationResult.IdToken,
      result2.data.body.data.AuthenticationResult.AccessToken
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
      padding: 10,
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
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/gtylogo.jpg")}
        />
        <AppForm
          initialValues={{
            email: email,
            code: "",
            proposed_password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="code"
            placeholder="6-Digit Verification Code"
            keyboardType="phone-pad"
            //   textContentType=""
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="proposed_password"
            placeholder="New Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirm_proposed_password"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton
            title="Reset Password"
            onPress={() => navigation.navigate("Account")}
          />
        </AppForm>
      </View>
      <ActivityIndicator visible={confirmforgotpasswordApi.loading} />
    </>
  );
}

export default ResetPasswordScreen;

// (values) => {
//   // console.log(values);
//   fetch(
//     "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/confirm-forgot-password",
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         email: values.email,
//         code: values.code,
//         proposed_password: values.proposed_password,
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.statusCode == 200) {
//         console.log(data.body.message);
//         fetch(
//           "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signin",
//           {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json;charset=UTF-8",
//             },
//             method: "POST",
//             body: JSON.stringify({
//               email: values.email,
//               password: values.proposed_password,
//             }),
//           }
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.statusCode == 200) {
//               console.log(data.body.message);
//               navigation.navigate("Account", {
//                 AccessToken:
//                   data.body.data.AuthenticationResult.AccessToken,
//               });
//             } else {
//               console.log(data);
//             }
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//       } else {
//         console.log(data.body.message);
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }
