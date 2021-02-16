import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getBottomSpace } from "react-native-iphone-x-helper";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <View
      style={[styles.screen, style, { paddingTop: useSafeAreaInsets().top }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});

export default Screen;
