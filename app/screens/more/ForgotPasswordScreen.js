import React, { useState } from "react";
import { Button, Image, StyleSheet, View, Alert } from "react-native";
import * as yup from "yup";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms/Index";
import { useTheme } from "../../config/ThemeProvider";

import AppButton from "../../components/Button";
import cognitoAuthApi from "../../api/cognitoAuth";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const forgotpasswordApi = useApi(cognitoAuthApi.forgotpassword);

  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ email }) => {
    const result = await forgotpasswordApi.cognitorequest(email);

    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    } else if (result.data.statusCode !== 200) {
      setError(result.data.body.message);
      return;
    }

    navigation.navigate("ResetPassword", {
      email: email,
    });
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
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <SubmitButton
            title="Send verification code"
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </AppForm>
      </View>
      <ActivityIndicator visible={forgotpasswordApi.loading} />
    </>
  );
}

export default ForgotPasswordScreen;
