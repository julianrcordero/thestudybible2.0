import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import * as yup from "yup";

import cognitoAuthApi from "../../api/cognitoAuth";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

import {
  AppForm as Form,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import { useTheme } from "../../config/ThemeProvider";

const validationSchema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  phone_number: yup.string().required().min(10).label("Phone"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(cognitoAuthApi.signup);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ name, email, password, phone_number }) => {
    const { colors, isDark } = useTheme();
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      // flex: 1 / 2,
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
    <>
      <View style={styles.container}>
        {/* <Image
          style={styles.logo}
          source={require("../../assets/gtylogo.jpg")}
        /> */}
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
          <View
            style={{
              backgroundColor: "green",
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 15,
              // width: "50%",
            }}
          >
            <SubmitButton
              title="Register"
              onPress={() => navigation.navigate("ConfirmRegister")}
            />
          </View>
        </Form>
      </View>
      <ActivityIndicator visible={registerApi.loading} />
    </>
  );
}

export default RegisterScreen;
