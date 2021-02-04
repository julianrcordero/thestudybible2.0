import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", ...otherProps }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    // width: "100%",
    marginLeft: 5,
  },
  text: {
    // backgroundColor: "green",
    color: colors.white,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
    // flex: 0.8,
  },
});

export default AppButton;
