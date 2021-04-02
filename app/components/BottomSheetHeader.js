import React from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeProvider";
import StudyToolBar from "./StudyToolBar";
import { PureComponent } from "react";

export default function BottomSheetHeader({
  currentHighlights,
  favoriteRef,
  setCurrentHighlights,
  settingsMode,
  snapToZero,
  studyScreen,
  studyToolBar,
}) {
  const { colors } = useTheme();
  const styles = {
    header: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderTopWidth: 0.3,
      borderColor: colors.border,
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
        <StudyToolBar
          colors={colors}
          currentHighlights={currentHighlights}
          favoriteRef={favoriteRef}
          ref={studyToolBar}
          setCurrentHighlights={setCurrentHighlights}
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
