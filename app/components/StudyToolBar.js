import React, { Component } from "react";
import { Button, TouchableOpacity, Text, View } from "react-native";
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
          height: "100%",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons name={icon} color={color} size={24} />
      </TouchableOpacity>
    );
  }
}

export default class StudyToolBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      textDecorationLine: "none",
      bookmarked: false,
      loved: false,
    };
  }

  _toggleBookmarked = () => {
    this.state.bookmarked === true
      ? this.setState({ bookmarked: false })
      : this.setState({ bookmarked: true });
  };

  _toggleLoved = () => {
    // this.state.loved === true
    //   ? this.setState({ loved: false })
    //   : this.setState({ loved: true });
    this.props.favoriteRef.current.toggleFavorite();
  };

  render() {
    const { colors } = this.props;

    return (
      <View
        style={{
          alignItems: "flex-start",
          height: "100%",
          flex: 0.75,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ToolBarIcon
          onPress={() => console.log("marker")}
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
        {/* <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-multiple"
            color={colors.icon}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-upload-outline"
            color={colors.icon}
            size={22}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}
