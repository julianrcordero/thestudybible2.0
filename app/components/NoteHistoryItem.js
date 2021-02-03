import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "./Text";
import colors from "../config/colors";

export default class NoteHistoryItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: false,
  };

  render() {
    const {
      title,
      subTitle,
      image,
      IconComponent,
      onPress,
      renderRightActions,
    } = this.props;

    return (
      <View style={{}}>
        <View style={styles.container}>
          {/* {IconComponent}
      {image && <Image style={styles.image} source={image} />} */}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {/* {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>} */}
        <TextInput
          autoCapitalize={"none"}
          keyboardType="default"
          multiline
          onBlur={() => this.setState({ isFocused: false })}
          onFocus={() => this.setState({ isFocused: true })}
          onSelectionChange={(event) => console.log(event.nativeEvent)}
          onSubmitEditing={
            (event) => {
              this.search(event.nativeEvent.text);
            }
            // this.updateText( event.nativeEvent.text)
          }
          placeholder={subTitle}
          style={[
            { borderColor: colors.medium, padding: 15 },
            this.state.isFocused ? { borderWidth: 0.5 } : null,
          ]}
          // value={subTitle}
        />
        {/* </View> */}
        {/* <MaterialCommunityIcons
        color={colors.medium}
        name="chevron-right"
        size={25}
      /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // backgroundColor: "green",
    // borderWidth: 0.2,
    borderColor: colors.medium,
    // flex: 1,
    flexDirection: "row",
    // height: 50,
    justifyContent: "flex-end",
    padding: 5,
    // backgroundColor: colors.white,
  },
  dateContainer: {
    backgroundColor: "yellow",
    // flex: 1,
    // marginLeft: 10,
    justifyContent: "flex-end",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.dark,
  },
  title: {
    color: colors.medium,
    fontWeight: "100",
  },
});
