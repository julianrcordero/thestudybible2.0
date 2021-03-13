import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MoreNavigator from "./MoreNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";

import BibleScreen from "../screens/BibleScreen";

import useNotifications from "../hooks/useNotifications";
import Animated from "react-native-reanimated";
import MenuButton from "../components/MenuButton";
import { useTheme } from "../config/ThemeProvider";

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

    const {
      bottomSheetRef,
      carousel,
      crossrefSize,
      currentBook,
      darkMode,
      fontFamily,
      fontSize,
      formatting,
      paragraphBibleRef,
      searchHistoryRef,
      setCurrentBook,
      setSettingsMode,
      setVerseList,
      titleSize,
      topPanel,
      verseList,
    } = props;

    return (
      <Tab.Navigator
        initialRouteName="Bible"
        swipeEnabled
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          darkMode: darkMode,
        }}
      >
        <Tab.Screen
          name="Home"
          // component={FeedNavigator}
          children={() => <FeedNavigator darkMode={darkMode} />}
          options={{
            tabBarIcon: "home",
          }}
        />

        <Tab.Screen
          name="Bible"
          children={() => (
            <BibleScreen
              formatting={formatting}
              bottomSheetRef={bottomSheetRef}
              carousel={carousel}
              crossrefSize={crossrefSize}
              currentBook={currentBook}
              darkMode={darkMode}
              HEADER_HEIGHT={HEADER_HEIGHT}
              headerY={headerY}
              fontFamily={fontFamily}
              fontSize={fontSize}
              paragraphBibleRef={paragraphBibleRef}
              scrollY={scrollY}
              searchHistoryRef={searchHistoryRef}
              setCurrentBook={setCurrentBook}
              setSettingsMode={setSettingsMode}
              setVerseList={setVerseList}
              titleSize={titleSize}
              topPanel={topPanel}
              verseList={verseList}
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

  return (
    <Animated.View
      style={{
        backgroundColor: colors.background,
        borderColor: colors.medium,
        borderTopWidth: 0.3,
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
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
          ></MenuButton>
        );
      })}
    </Animated.View>
  );
}

export default AppNavigator;
