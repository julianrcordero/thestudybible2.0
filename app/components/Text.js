import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";

function AppText({ children, style, ...otherProps }) {
  const { colors } = useTheme();

  return (
    <Text
      style={[defaultStyles.bibleText, style, { color: colors.text }]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export default AppText;
