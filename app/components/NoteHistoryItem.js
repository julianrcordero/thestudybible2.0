import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "./Text";
import colors from "../config/colors";
import AppText from "./Text";

export default class NoteHistoryItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: false,
    noteText: this.props.subTitle,
  };

  render() {
    const {
      title,
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
        <View>
          {this.state.isFocused ? (
            <>
              <TextInput
                autoCapitalize={"none"}
                keyboardType="default"
                defaultValue={this.state.noteText}
                multiline
                onBlur={() => {
                  console.log("TextInput onBlur");
                  this.setState({ isFocused: false });
                }}
                onFocus={() => this.setState({ isFocused: true })}
                onSelectionChange={(event) => console.log("onSelectionChange")}
                onSubmitEditing={
                  (event) => {
                    // this.search(event.nativeEvent.text);
                    this.setState({ noteText: event.nativeEvent.text });
                  }
                  // this.updateText( event.nativeEvent.text)
                }
                placeholder={"Your note here"}
                style={[
                  { borderColor: colors.medium, padding: 15 },
                  this.state.isFocused ? { borderWidth: 0.5 } : null,
                ]}
              />
              <Button
                title={"Save"}
                onPress={() => this.setState({ isFocused: false })}
              ></Button>
            </>
          ) : (
            <Text onPress={() => this.setState({ isFocused: true })}>
              {this.state.noteText}
            </Text>
          )}
        </View>
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
