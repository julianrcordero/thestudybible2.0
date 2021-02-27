import React from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import BottomSheetToolBar from "./BottomSheetToolBar";

export default function BibleHeader({ snapToHalf }) {
  const { colors, isDark } = useTheme();

  const styles = {
    header: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderTopWidth: 0.3,
      flexDirection: "row",
      height: 50,
      justifyContent: "space-between",
      paddingHorizontal: 15,
      width: "100%",
    },
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <BottomSheetToolBar colors={colors} />
      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );
}
