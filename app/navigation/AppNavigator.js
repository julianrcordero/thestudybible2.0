import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MoreNavigator from "./MoreNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";

import BibleScreen from "../screens/BibleScreen";

import useNotifications from "../hooks/useNotifications";
import Animated from "react-native-reanimated";
const { Value, diffClamp, interpolateNode, multiply, timing } = Animated;

import MenuButton from "../components/MenuButton";
import { useTheme } from "../config/ThemeProvider";

// import AuthNavigator from "./AuthNavigator";

const Tab = createBottomTabNavigator();

const HEADER_HEIGHT = 70;

const scrollY = new Value(0);
const diffClampScrollY = diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = interpolateNode(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
  extrapolate: "clamp",
});
const headerOpacity = interpolateNode(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [1, 0],
  extrapolate: "clamp",
});
const navigationY = multiply(headerY, -1);

const onScroll = Animated.event(
  [
    {
      nativeEvent: { contentOffset: { y: scrollY } },
    },
  ],
  { useNativeDriver: true }
);

const AppNavigator = (props) =>
  // { user }
  {
    useNotifications();
    const { colors, isDark } = useTheme();

    const {
      bibleSectionsRef,
      bibleScreen,
      bottomSheetRef,
      bottomSheetContentRef,
      carousel,
      headerContentRef,
      paragraphBibleRef,
      searchHistoryRef,
      studyScreen,
      titleSize,
      toolBar,
      topPanel,
    } = props;

    return (
      <Tab.Navigator
        initialRouteName="Bible"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          darkMode: isDark,
        }}
      >
        <Tab.Screen
          name="Home"
          // component={FeedNavigator}
          children={() => <FeedNavigator darkMode={isDark} />}
          options={{
            tabBarIcon: "home",
          }}
        />

        <Tab.Screen
          name="Bible"
          children={() => (
            <BibleScreen
              bibleScreen={bibleScreen}
              bibleSectionsRef={bibleSectionsRef}
              bottomSheetRef={bottomSheetRef}
              bottomSheetContentRef={bottomSheetContentRef}
              carousel={carousel}
              colors={colors}
              darkMode={isDark}
              headerContentRef={headerContentRef}
              HEADER_HEIGHT={HEADER_HEIGHT}
              headerY={headerY}
              headerOpacity={headerOpacity}
              onScroll={onScroll}
              paragraphBibleRef={paragraphBibleRef}
              ref={bibleScreen}
              // scrollY={scrollY}
              searchHistoryRef={searchHistoryRef}
              studyScreen={studyScreen}
              titleSize={titleSize}
              toolBar={toolBar}
              topPanel={topPanel}
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
  const { colors } = useTheme();

  const tabBarStyle = {
    backgroundColor: colors.background,
    borderColor: colors.medium,
    borderTopWidth: 0.3,
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    opacity: headerOpacity,
    transform: [{ translateY: navigationY }],
    zIndex: 0,
  };

  return (
    <Animated.View style={tabBarStyle}>
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
          ></MenuButton>
        );
      })}
    </Animated.View>
  );
}

export default AppNavigator;
