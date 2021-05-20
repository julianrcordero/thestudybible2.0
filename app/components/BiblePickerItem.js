import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./Text";

class BiblePickerItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = {
    container: {
      alignItems: "center",
      // borderColor: colors.white,
      justifyContent: "center",
    },
    text: {
      color: this.props.textColor,
    },
  };

  render() {
    const {
      aspectRatio = 1.2,
      backgroundColor,
      borderWidth = 1,
      flex,
      height,
      label,
      width = "100%",
    } = this.props;

    return (
      <View
        style={[
          this.styles.container,
          {
            backgroundColor: backgroundColor,
            borderWidth,
            aspectRatio,
            height,
            flex,
            width,
          },
        ]}
      >
        <AppText style={this.styles.text}>{label}</AppText>
      </View>
    );
  }
}

export default BiblePickerItem;
