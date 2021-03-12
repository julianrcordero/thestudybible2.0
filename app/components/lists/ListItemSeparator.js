import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../config/ThemeProvider";

function ListItemSeparator(props) {
  const { colors, isDark } = useTheme();
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
