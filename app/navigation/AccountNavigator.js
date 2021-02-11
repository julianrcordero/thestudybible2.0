import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../screens/account/MoreScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import AccountScreen from "../screens/account/AccountScreen";
import AppText from "../components/Text";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator initialRouteName="More" mode="card">
    <Stack.Screen name="More" component={MoreScreen} />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={() => ({
        headerRight: () => (
          <AppText style={styles.sectionTitle}>{"Account"}</AppText>
        ),
        headerStyle: {
          height: 55,
        },
        headerTitle: "",
      })}
    />
    {/* <Stack.Screen name="Resource" component={ResourceScreen} /> */}
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default AccountNavigator;
