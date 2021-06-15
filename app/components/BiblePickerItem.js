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
      backgroundColor: "red",
      textAlign: "center",
      alignSelf: "stretch",
      color: this.props.textColor,
      height: "100%",
    },
  };

  render() {
    const {
      aspectRatio = 1.2,
      backgroundColor,
      borderWidth = 1,
      label,
      onPress,
      width = "100%",
    } = this.props;

    const myStyle = {
      backgroundColor: backgroundColor,
      borderWidth,
      aspectRatio,
      width,
    };

    return (
      // <View style={[this.styles.container, myStyle]}>
      <AppText style={[this.styles.text, myStyle]} onPress={onPress}>
        {label}
      </AppText>
      // </View>
    );
  }
}

export default BiblePickerItem;
