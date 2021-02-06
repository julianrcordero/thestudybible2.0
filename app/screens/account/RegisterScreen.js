import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import * as yup from "yup";

import usersApi from "../../api/users";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

import {
  AppForm as Form,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import colors from "../../config/colors";

const validationSchema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  phone_number: yup.string().required().min(10).label("Phone"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(authApi.signup);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ name, email, password, phone_number }) => {
    const result = await registerApi.cognitorequest(
      name,
      email,
      password,
      phone_number
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

    navigation.navigate("ConfirmRegister", {
      email: email,
      password: password,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/gtylogo.jpg")}
        />
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone_number: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            keyboardType="phone-pad"
            name="phone_number"
            placeholder="Phone"
            textContentType="telephoneNumber"
          />
          <SubmitButton
            title="Register"
            onPress={() => navigation.navigate("ConfirmRegister")}
          />
        </Form>
      </View>
      <ActivityIndicator visible={registerApi.loading} />
    </>
  );
}

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

export default RegisterScreen;

// (values) => {
//   // console.log(values);
//   fetch(
//     "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signup",
//     {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         phone_number: values.phone_number,
//       }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.statusCode == 200) {
//         console.log(data.body.message);
//         navigation.navigate("ConfirmRegister", {
//           email: values.email,
//           password: values.password,
//         });
//       } else {
//         console.log(data.body.message);
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }
