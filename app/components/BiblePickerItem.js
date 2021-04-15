import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./Text";

class BiblePickerItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      aspectRatio = 1,
      borderWidth = 1,
      flex,
      height,
      item,
      label,
      width = "100%",
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: item.backgroundColor,
            borderWidth,
            aspectRatio,
            height,
            flex,
            width,
          },
        ]}
      >
        <AppText style={styles.text}>
          {/* {"A"} */}
          {label}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // borderColor: colors.white,
    justifyContent: "center",
  },
  text: {},
});

export default BiblePickerItem;
