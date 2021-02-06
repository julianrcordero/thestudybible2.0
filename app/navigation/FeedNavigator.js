import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import BibleListingsScreen from "../screens/BibleListingsScreen";
import BibleListingDetailsScreen from "../screens/BibleListingDetailsScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    {/* <Stack.Screen name="BibleListings" component={BibleListingsScreen} />
    <Stack.Screen
      name="BibleListingDetails"
      component={BibleListingDetailsScreen}
    /> */}
  </Stack.Navigator>
);

export default FeedNavigator;
