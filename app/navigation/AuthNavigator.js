import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/more/AccountScreen";
import LoginScreen from "../screens/more/LoginScreen";
import ConfirmRegisterScreen from "../screens/more/ConfirmRegisterScreen";
import ForgotPasswordScreen from "../screens/more/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/more/ResetPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    <Stack.Screen name="ConfirmRegister" component={ConfirmRegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
