import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../config/ThemeContext";

function ListItemSeparator(props) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    // backgroundColor: colors.light,
  },
});

export default ListItemSeparator;
