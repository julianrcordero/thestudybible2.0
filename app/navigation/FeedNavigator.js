import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ResourceScreen from "../screens/ResourceScreen";
import BibleListingsScreen from "../screens/BibleListingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AppText from "../components/Text";
import colors from "../config/colors";
// import LogoTitle from "../components/LogoTitle";

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", margin: 20 }}>
      <Image
        style={{
          aspectRatio: 1,
          width: 30,
          marginRight: 15,
        }}
        source={require("../assets/StudyBibleApp_Logo_black.png")}
      ></Image>

      <AppText style={{ fontSize: 18, fontWeight: "bold" }}>
        {"The Study Bible"}
      </AppText>
    </View>
  );
};

const FeedNavigator = () => (
  <Stack.Navigator mode="card">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: (props) => <LogoTitle {...props} />,
        // title: "The Study Bible",
        headerStyle: {
          backgroundColor: colors.light,
          height: 55,
        },
        headerTitle: "",
        // headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    />
    {/* <Stack.Screen
      name="Resource"
      component={ResourceScreen}
      // options={{ headerShown: false }}
    /> */}
    <Stack.Screen
      name="Resource"
      component={ResourceScreen}
      options={({ route }) => ({
        // headerBackTitleStyle: { paddingHorizontal: 15 },
        headerBackTitle: "Home",
        headerRight: () => (
          <AppText style={styles.sectionTitle}>
            {route.params.item.category ?? "Devotionals"}
          </AppText>
        ),
        headerStyle: {
          height: 55,
        },
        headerTitle: "",
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    // fontWeight: "bold",
    paddingHorizontal: 20,
  },
});

export default FeedNavigator;
