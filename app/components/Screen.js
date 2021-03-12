import React from "react";
import Constants from "expo-constants";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "../config/ThemeProvider";

function Screen({ children, style, flex = 1 }) {
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: flex,
      paddingTop: Constants.statusBarHeight,
    },
  });

  return (
    <>
      <StatusBar
        animated
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <SafeAreaView
        style={[
          styles.screen,
          style,
          // { paddingTop: useSafeAreaInsets().top }
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
}

export default Screen;
