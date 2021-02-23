import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ResourceScreen from "../screens/ResourceScreen";
import AppText from "../components/Text";
import { useTheme } from "../config/ThemeContext";

// import LogoTitle from "../components/LogoTitle";

const Stack = createStackNavigator();

const LogoTitle = ({ darkMode }) => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "yellow",
        flexDirection: "row",
        marginHorizontal: 20,
        // marginVertical: 15,
      }}
    >
      <Image
        style={{
          aspectRatio: 1,
          width: 30,
          marginRight: 15,
        }}
        source={
          darkMode
            ? require("../assets/studyBibleAppLogo.jpg")
            : require("../assets/StudyBibleApp_Logo_black.png")
        }
      ></Image>

      <AppText style={{ fontSize: 18, fontWeight: "bold" }}>
        {"The Study Bible"}
      </AppText>
    </View>
  );
};

const FeedNavigator = ({ darkMode }) => (
  <Stack.Navigator mode="card">
    <Stack.Screen
      name="Home"
      // component={HomeScreen}
      children={() => <HomeScreen darkMode={darkMode} />}
      options={{
        headerLeft: (props) => <LogoTitle {...props} darkMode={darkMode} />,
        // title: "The Study Bible",
        headerStyle: {
          backgroundColor: darkMode ? colors.medium : colors.light,
          height: 55,
        },
        headerTitle: "",
        // headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    />

    <Stack.Screen
      name="Resource"
      component={ResourceScreen}
      options={({ route }) => ({
        // headerBackTitleStyle: { paddingHorizontal: 15 },
        // headerBackTitle: "Home",
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
