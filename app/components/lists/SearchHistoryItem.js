import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import { useTheme } from "../../config/ThemeProvider";

import AppText from "../Text";

function SearchHistoryItem({ title, onPress, renderRightActions }) {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.white,
      borderWidth: 0.3,
      // borderColor: colors.light,
      flexDirection: "row",
      height: 60,
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },

    title: {
      fontSize: 14,
      // fontWeight: "500",
    },
  });
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        underlayColor={colors.light}
        onPress={onPress}
        style={styles.container}
      >
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <MaterialCommunityIcons
          color={colors.medium}
          name="arrow-right-circle-outline"
          size={20}
        />
      </TouchableOpacity>
    </Swipeable>
  );
}

export default SearchHistoryItem;
