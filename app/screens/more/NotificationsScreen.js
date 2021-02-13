import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Switch,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();

import AppButton from "../../components/Button";
import SegmentedControl from "@react-native-community/segmented-control";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

import TextInput from "../../components/TextInput";
import ConfirmRegisterScreen from "./ConfirmRegisterScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import colors from "../../config/colors";
import AppText from "../../components/Text";
import useAuth from "../../auth/useAuth";
import ListItem from "../../components/lists/ListItem";
import Icon from "../../components/Icon";
import { SubmitButton } from "../../components/forms/Index";
import AccountEditScreen from "./AccountEditScreen";
import defaultStyles from "../../config/styles";

export default function NotificationsScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [pickerType, setPickerType] = useState(0);

  return (
    <View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={[defaultStyles.bibleText, styles.title]}>
            {"General Updates"}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Keep up to date on important app-related information."}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={styles.title}>{"Resource Offers"}</AppText>
          <AppText style={styles.subTitle}>
            {"Keep up to date on resource offers from Grace To You"}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={[defaultStyles.bibleText, styles.title]}>
            {"Devotional Alarm"}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Receive daily reminders to read your devotionals"}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 15,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 6,
  },
  subTitle: {
    fontSize: 14,
    width: "70%",
  },
});
