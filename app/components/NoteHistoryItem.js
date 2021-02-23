import React, { PureComponent } from "react";
import {
  Alert,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import Button from "./Button";
import Text from "./Text";
import { useTheme } from "../config/ThemeContext";

export default class NoteHistoryItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: this.props.open ?? false,
    noteText: this.props.subTitle,
    oldNoteText: this.props.subTitle,
  };

  notFinishedAlert = () => {
    this.state.noteText == ""
      ? this.cancel()
      : Alert.alert(
          "Are you sure you want to delete this note?",
          "",
          [
            {
              text: "Delete",
              onPress: this.cancel,
              style: "cancel",
            },
            { text: "Go back" },
          ],
          { cancelable: false }
        );
  };

  setFocusedTrue = () => {
    this.setState({ isFocused: true });
    this.props.carousel.current.setNativeProps({ scrollEnabled: false });
  };

  setFocusedFalse = () => {
    this.setState({ isFocused: false });
    this.props.carousel.current.setNativeProps({ scrollEnabled: true });
  };

  cancel = () => {
    this.setFocusedFalse();
    this.props.handleDelete();
  };

  save = () => {
    if (this.state.noteText == "") {
      this.props.handleDelete();
      return;
    }

    this.setFocusedFalse();

    this.setState({ oldNoteText: this.state.noteText });
  };

  styles = StyleSheet.create({
    container: {
      // alignItems: "center",
      backgroundColor: "green",
      // borderWidth: 0.3,
      // borderColor: colors.medium,
      // flex: 1,
      flexDirection: "row",
      // height: 50,
      justifyContent: "flex-end",
      padding: 5,
      backgroundColor: colors.white,
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
    date: {
      color: colors.medium,
      fontSize: 12,
      fontWeight: "100",
    },
  });

  render() {
    const { carousel, date } = this.props;

    const DismissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={this.notFinishedAlert}>
        {children}
      </TouchableWithoutFeedback>
    );

    return (
      <View style={{ marginVertical: 15 }}>
        <View style={styles.container}>
          <Text style={styles.date} numberOfLines={1}>
            {date}
          </Text>
        </View>
        <View>
          {this.state.isFocused ? (
            <>
              <TextInput
                autoCapitalize={"none"}
                keyboardType="default"
                defaultValue={this.state.oldNoteText}
                multiline
                // onBlur={this.notFinishedAlert}
                onEndEditing={this.save}
                onFocus={this.setFocusedTrue}
                // onSelectionChange={(event) => console.log("onSelectionChange")}
                blurOnSubmit={true}
                onChangeText={(newText) => this.setState({ noteText: newText })}
                placeholder={"Your note here"}
                style={[
                  {
                    borderColor: colors.medium,
                    marginHorizontal: 10,
                    padding: 5,
                  },
                  this.state.isFocused ? { borderWidth: 0.5 } : null,
                ]}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginVertical: 10,
                  marginRight: 10,
                }}
              >
                {this.state.noteText == "" ? null : (
                  <Button
                    title={"Save"}
                    onPress={this.save} //API CALL
                  ></Button>
                )}
                <Button
                  color={this.state.noteText == "" ? "secondary" : "danger"}
                  title={this.state.noteText == "" ? "Cancel" : "Delete"}
                  onPress={this.notFinishedAlert} //API CALL
                ></Button>
              </View>
            </>
          ) : (
            <Text onPress={this.setFocusedTrue}>{this.state.oldNoteText}</Text>
          )}
        </View>
      </View>
    );
  }
}
