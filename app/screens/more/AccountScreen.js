import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();

import AppButton from "../../components/Button";
import SegmentedControl from "@react-native-community/segmented-control";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

import ConfirmRegisterScreen from "./ConfirmRegisterScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import colors from "../../config/colors";
import AppText from "../../components/Text";
import useAuth from "../../auth/useAuth";
import ListItem from "../../components/lists/ListItem";
import Icon from "../../components/Icon";
import { SubmitButton } from "../../components/forms/Index";

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
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
        // return <RegisterScreen />;
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
        <View
          style={{
            backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <ListItem
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
            onPress={() => logOut()}
          /> */}
          <AppButton title="LOG OUT" onPress={() => logOut()} />
        </View>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    // paddingVertical: 15,
  },
});

export default AccountScreen;
