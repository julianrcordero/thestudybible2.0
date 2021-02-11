import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SegmentedControl from "@react-native-community/segmented-control";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import Collapsible from "react-native-collapsible";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import HomeScreen from "../screens/HomeScreen";
import ListingEditScreen from "../screens/ListingEditScreen";

import AccountScreen from "../screens/account/AccountScreen";
import BibleScreen from "../screens/BibleScreen";

import NewListingButton from "./NewListingButton";
import useNotifications from "../hooks/useNotifications";
import Animated from "react-native-reanimated";
import MenuButton from "../components/MenuButton";
import colors from "../config/colors";
// import AuthNavigator from "./AuthNavigator";

const Tab = createBottomTabNavigator();

const HEADER_HEIGHT = 70;
const scrollY = new Animated.Value(0);
const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = Animated.interpolate(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
});
const navigationY = Animated.multiply(headerY, -1);

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

const AppNavigator = (props) =>
  // { user }
  {
    useNotifications();

    return (
      <Tab.Navigator
        initialRouteName="More"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{}}
      >
        <Tab.Screen
          name="Home"
          component={FeedNavigator}
          options={{
            tabBarIcon: "home",
          }}
        />

        <Tab.Screen
          name="Bible"
          children={() => (
            <BibleScreen
              bottomSheetRef={props.bottomSheetRef}
              carousel={props.carousel}
              crossrefSize={props.crossrefSize}
              currentBook={props.currentBook}
              HEADER_HEIGHT={HEADER_HEIGHT}
              headerY={headerY}
              fontSize={props.fontSize}
              paragraphBibleRef={props.paragraphBibleRef}
              scrollY={scrollY}
              searchHistoryRef={props.searchHistoryRef}
              setCurrentBook={props.setCurrentBook}
              setSettingsMode={props.setSettingsMode}
              setVerseList={props.setVerseList}
              titleSize={props.titleSize}
              topPanel={props.topPanel}
              verseList={props.verseList}
            />
          )}
          options={{
            tabBarIcon: "book-open-page-variant",
          }}
        />
        <Tab.Screen
          name="John's Notes"
          component={ListingEditScreen}
          options={{
            tabBarIcon: "book-variant-multiple",
          }}
        />
        <Tab.Screen
          name="More"
          component={AccountNavigator}
          options={{
            tabBarIcon: "menu",
          }}
        />
      </Tab.Navigator>
    );
  };

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <Animated.View
      style={{
        borderColor: colors.medium,
        borderTopWidth: 0.3,
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        backgroundColor: colors.secondary,
        transform: [{ translateY: navigationY }],
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <MenuButton
            key={route.key}
            title={label}
            icon={icon} //{require("./app/assets/home.png")}
            onPress={onPress}
            color={isFocused ? colors.medium : colors.black}
          ></MenuButton>
        );
      })}
    </Animated.View>
  );
}

export default AppNavigator;
