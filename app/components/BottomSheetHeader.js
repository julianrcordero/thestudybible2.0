import React from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeProvider";
import StudyToolBar from "./StudyToolBar";
import { PureComponent } from "react";

export default function BottomSheetHeader({
  bottomSheetContentRef,
  favoriteRef,
  settingsMode,
  snapToZero,
  studyScreen,
  studyToolBar,
}) {
  const { colors } = useTheme();
  const styles = {
    header: {
      alignItems: "flex-start",
      backgroundColor: colors.background,
      borderTopWidth: 0.3,
      borderColor: colors.border,
      flexDirection: "row",
      height: 40,
      justifyContent: "space-between",
      paddingHorizontal: 15,
      width: "100%",
    },
  };

  return (
    <View style={[styles.header]}>
      {bottomSheetContentRef.current.state.settingsMode ? (
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "bold",
            paddingVertical: 7,
          }}
        >
          Text Settings
        </Text>
      ) : (
        <StudyToolBar
          colors={colors}
          favoriteRef={favoriteRef}
          ref={studyToolBar}
          studyScreen={studyScreen}
        />
      )}
      <Button
        title="Done"
        onPress={snapToZero}
        style={{ textAlign: "center" }}
      />
    </View>
  );
}
