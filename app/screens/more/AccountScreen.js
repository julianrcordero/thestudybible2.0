import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();
import SegmentedControl from "@react-native-community/segmented-control";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ConfirmRegisterScreen from "./ConfirmRegisterScreen";

import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

import useAuth from "../../auth/useAuth";
import AccountEditScreen from "./AccountEditScreen";

function AccountScreen() {
  const { user, logOut } = useAuth();
  const { colors } = useTheme();
  const [pickerType, setPickerType] = useState(0);

  const selectedPicker = () => {
    switch (pickerType) {
      case 0:
        return (
          <NavigationContainer independent={true}>
            <Stack2.Navigator screenOptions={{ headerShown: false }}>
              <Stack2.Screen name="Login" component={LoginScreen} />
              <Stack2.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
              <Stack2.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
              />
            </Stack2.Navigator>
          </NavigationContainer>
        );
      case 1:
        return (
          <NavigationContainer independent={true}>
            <Stack3.Navigator screenOptions={{ headerShown: false }}>
              <Stack3.Screen name="Register" component={RegisterScreen} />
              <Stack3.Screen
                name="ConfirmRegister"
                component={ConfirmRegisterScreen}
              />
            </Stack3.Navigator>
          </NavigationContainer>
        );
      default:
        break;
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 25,
      }}
    >
      {user ? (
        <AccountEditScreen user={user} logOut={logOut} />
      ) : (
        <>
          <SegmentedControl
            values={["Log In", "Register"]}
            selectedIndex={pickerType}
            onChange={(event) => {
              setPickerType(event.nativeEvent.selectedSegmentIndex);
            }}
            style={{ backgroundColor: colors.white, height: 50 }}
          />
          {selectedPicker()}
        </>
      )}
    </View>
    // <ImageBackground
    //   // blurRadius={3}
    //   style={styles.background}
    //   source={require("../../assets/studyBibleAccountScreen.png")}
    // >
    //   <View style={styles.buttonsContainer}>
    //     <AppButton
    //       title="Login"
    //       onPress={() => navigation.navigate("Login")}
    //     ></AppButton>
    //     <AppButton
    //       title="Register"
    //       color="secondary"
    //       onPress={() => navigation.navigate("Register")}
    //     ></AppButton>
    //   </View>
    // </ImageBackground>
  );
}

export default AccountScreen;
