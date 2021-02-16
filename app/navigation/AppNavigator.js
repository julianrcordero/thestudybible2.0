import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MoreNavigator from "./MoreNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";

import BibleScreen from "../screens/BibleScreen";

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

const AppNavigator = (props) =>
  // { user }
  {
    useNotifications();

    return (
      <Tab.Navigator
        initialRouteName="Bible"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={
          {
            // safeAreaInsets: { bottom: useSafeAreaInsets().bottom },
          }
        }
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
              formatting={props.formatting}
              bottomSheetRef={props.bottomSheetRef}
              carousel={props.carousel}
              crossrefSize={props.crossrefSize}
              currentBook={props.currentBook}
              darkMode={props.darkMode}
              HEADER_HEIGHT={HEADER_HEIGHT}
              headerY={headerY}
              fontFamily={props.fontFamily}
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
          component={MoreNavigator}
          options={{
            tabBarIcon: "menu",
          }}
        />
      </Tab.Navigator>
    );
  };

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <>
      <Animated.View
        style={{
          borderColor: colors.medium,
          borderTopWidth: 0.3,
          // flex: 1,
          flexDirection: "row",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: useSafeAreaInsets().bottom,
          height: 70,
          backgroundColor: colors.secondary,
          transform: [{ translateY: navigationY }],
          zIndex: 0,
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
      <View
        style={{
          backgroundColor: colors.primary,
          height: useSafeAreaInsets().bottom,
        }}
      ></View>
    </>
  );
}

export default AppNavigator;
