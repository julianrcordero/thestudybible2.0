import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../screens/more/MoreScreen";
import NotificationsScreen from "../screens/more/NotificationsScreen";
import AboutScreen from "../screens/more/AboutScreen";
import AccountScreen from "../screens/more/AccountScreen";
import AppText from "../components/Text";
import colors from "../config/colors";
// import LogoTitle from "../components/LogoTitle";

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 15,
      }}
    >
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

const MoreNavigator = () => (
  <>
    <LogoTitle />
    <Stack.Navigator initialRouteName="More" mode="card">
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
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
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={() => ({
          headerBackTitle: "More",
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
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={() => ({
          headerBackTitle: "More",
          headerRight: () => (
            <AppText style={styles.sectionTitle}>{"Notifications"}</AppText>
          ),
          headerStyle: {
            height: 55,
          },
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={() => ({
          headerBackTitle: "More",
          headerRight: () => (
            <AppText style={styles.sectionTitle}>{"About"}</AppText>
          ),
          headerStyle: {
            height: 55,
          },
          headerTitle: "",
        })}
      />
    </Stack.Navigator>
  </>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default MoreNavigator;
