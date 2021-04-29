import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useTheme } from "../config/ThemeProvider";
import defaultStyles from "../config/styles";
import StudyToolBar from "./StudyToolBar";

class HeaderContent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    settingsMode: false,
  };

  render() {
    const { colors, favoriteRef, studyToolBar, studyScreen } = this.props;

    return (
      <>
        {this.state.settingsMode ? (
          <Text
            style={{
              // backgroundColor: "green",
              color: colors.text,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
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
      </>
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
      alignItems: "center",
      backgroundColor: colors.background,
      borderTopWidth: 0.3,
      borderColor: colors.border,
      flexDirection: "row",
      height: 50,
      justifyContent: "space-between",
      // paddingHorizontal: ,
      width: "100%",
    },
  };

  return (
    <View style={[styles.header, defaultStyles.headerPaddingHorizontal]}>
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
