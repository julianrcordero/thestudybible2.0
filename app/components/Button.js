import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../config/ThemeProvider";

function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  ...otherProps
}) {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      // flex: 1,
      flexDirection: "row",
      backgroundColor: colors.primary,
      borderRadius: 5,
      height: 40,
      justifyContent: "center",
      // paddingVertical: 8,
      // paddingHorizontal: 16,
      width: "100%",
      // marginLeft: 5,
    },
    text: {
      // backgroundColor: "green",
      color: colors.secondary,
      fontSize: 16,
      textTransform: "uppercase",
      fontWeight: "bold",
      textAlign: "center",
      // flex: 0.8,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;
