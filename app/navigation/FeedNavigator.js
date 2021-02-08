import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import BibleListingsScreen from "../screens/BibleListingsScreen";
import BibleListingDetailsScreen from "../screens/BibleListingDetailsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AppText from "../components/Text";
import colors from "../config/colors";

const Stack = createStackNavigator();

function LogoTitle() {
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
}

const FeedNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
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
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="BibleListings" component={BibleListingsScreen} />
    <Stack.Screen
      name="BibleListingDetails"
      component={BibleListingDetailsScreen}
    /> */}
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FeedNavigator;
