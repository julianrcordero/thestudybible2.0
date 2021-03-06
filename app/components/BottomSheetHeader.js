import React from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import StudyToolBar from "./StudyToolBar";
import { PureComponent } from "react";

export default function BottomSheetHeader({ settingsMode, snapToZero }) {
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
    <View style={[styles.header]}>
      {settingsMode ? (
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
          Text Settings
        </Text>
      ) : (
        <StudyToolBar colors={colors} />
      )}
      <Button
        title="Done"
        onPress={snapToZero}
        style={{ textAlign: "center" }}
      />
    </View>
  );
}