import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeProvider";
import StudyToolBar from "./StudyToolBar";
import { PureComponent } from "react";

class HeaderContent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    settingsMode: false,
  };

  render() {
    const { colors, favoriteRef, studyToolBar, studyScreen } = this.props;

    return this.state.settingsMode ? (
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
    );
  }
}

export default function BottomSheetHeader({
  bottomSheetContentRef,
  favoriteRef,
  headerContentRef,
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
      paddingHorizontal: 20,
      width: "100%",
    },
  };

  return (
    <View style={[styles.header]}>
      <HeaderContent
        bottomSheetContentRef={bottomSheetContentRef}
        colors={colors}
        favoriteRef={favoriteRef}
        ref={headerContentRef}
        studyToolBar={studyToolBar}
        studyScreen={studyScreen}
      />
      <Button
        title="Done"
        onPress={snapToZero}
        style={{ textAlign: "center" }}
      />
    </View>
  );
}
