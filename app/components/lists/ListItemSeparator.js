import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../config/ThemeContext";

function ListItemSeparator(props) {
  const styles = StyleSheet.create({
    separator: {
      width: "100%",
      height: 1,
      backgroundColor: colors.light,
    },
  });

  return <View style={styles.separator} />;
}

export default ListItemSeparator;
