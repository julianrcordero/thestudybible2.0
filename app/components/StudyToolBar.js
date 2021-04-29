import React, { Component } from "react";
import { Button, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../config/ThemeProvider";

import { MaterialCommunityIcons } from "@expo/vector-icons";

class ToolBarIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, onPress, icon } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: "center",
          aspectRatio: 1,
          // backgroundColor: "yellow",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons name={icon} color={color} size={24} />
      </TouchableOpacity>
    );
  }
}

class ColorCircle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color } = this.props;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color,
          borderRadius: 20,
          height: "60%",
          // height: 22,
          aspectRatio: 1,
        }}
      ></TouchableOpacity>
    );
  }
}

export default class StudyToolBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      currentVerse: "01001001",
      textDecorationLine: "none",
      bookmarked: false,
      loved: false,
      colorPaletteVisible: false,
    };
  }

  _toggleBookmarked = () => {
    this.state.bookmarked === true
      ? this.setState({ bookmarked: false })
      : this.setState({ bookmarked: true });
  };

  _toggleHighlight = () => {
    this.props.studyScreen.current.toggleColorPalette();
  };

  _toggleLoved = () => {
    // this.state.loved === true
    //   ? this.setState({ loved: false })
    //   : this.setState({ loved: true });
    this.props.favoriteRef.current.toggleFavorite();
  };

  toggleColorPalette = () => {
    this.setState({
      colorPaletteVisible: this.state.colorPaletteVisible ? false : true,
    });
  };

  render() {
    const { colors } = this.props;

    return (
      <View style={{ height: "100%" }}>
        <View
          style={{
            alignItems: "flex-start",
            // backgroundColor: "blue",
            // height: "100%",
            // flex: 0.75,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <ToolBarIcon
            onPress={this.toggleColorPalette}
            color={colors.icon}
            icon="marker"
          />
          <ToolBarIcon
            onPress={this._toggleBookmarked}
            color={colors.icon}
            icon={this.state.bookmarked ? "bookmark" : "bookmark-outline"}
          />
          <ToolBarIcon
            onPress={this._toggleLoved}
            color={this.state.loved ? "red" : colors.icon}
            icon={this.state.loved ? "heart" : "heart-outline"}
          />
          <ToolBarIcon
            onPress={() => console.log("copy")}
            color={colors.icon}
            icon={"file-multiple"}
          />
          <ToolBarIcon
            onPress={() => console.log("share")}
            color={colors.icon}
            icon={"file-upload-outline"}
          />
        </View>
        {this.state.colorPaletteVisible ? (
          <View style={{ width: "90%" }}>
            <View style={styles.triangle}></View>
            <View
              style={{
                alignItems: "center",
                // bottom: -40,
                backgroundColor: "black",
                flexGrow: 1,
                flexDirection: "row",
                height: 40,
                justifyContent: "space-around",
                // left: 0,
                // width: "80%",
              }}
            >
              <ColorCircle color={"red"} />
              <ColorCircle color={"orange"} />
              <ColorCircle color={"yellow"} />
              <ColorCircle color={"green"} />
              <ColorCircle color={"blue"} />
              <ColorCircle color={"purple"} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    // left: 10,
  },
});
