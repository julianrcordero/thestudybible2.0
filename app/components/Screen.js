import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "../config/ThemeContext";

function Screen({ children, style }) {
  return (
    <SafeAreaView
      style={[
        styles.screen,
        style,
        // { paddingTop: useSafeAreaInsets().top }
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: colors.primary,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
