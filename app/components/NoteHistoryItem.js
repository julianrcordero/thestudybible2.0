import React, { PureComponent } from "react";
import {
  Alert,
  Keyboard,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import Button from "./Button";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";

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
  };

  setFocusedFalse = () => {
    this.setState({ isFocused: false });
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
    container: { marginVertical: 15 },
    image: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    date: {
      textAlign: "right",
    },
    text: {
      color: this.props.colors.text,
    },
  });

  render() {
    const { carousel, colors, date } = this.props;

    const DismissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={this.notFinishedAlert}>
        {children}
      </TouchableWithoutFeedback>
    );

    return (
      <View style={this.styles.container}>
        <Text style={[this.styles.date, { color: colors.primary }]}>
          {date}
        </Text>
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
                    color: colors.text,
                    // borderColor: colors.medium,
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
                    style={{ width: "50%" }}
                  ></Button>
                )}
                <Button
                  color={this.state.noteText == "" ? "secondary" : "error"}
                  title={this.state.noteText == "" ? "Cancel" : "Delete"}
                  style={{ width: "50%" }}
                  onPress={this.notFinishedAlert} //API CALL
                ></Button>
              </View>
            </>
          ) : (
            <AppText
              onPress={this.setFocusedTrue}
              style={{ color: colors.text }}
            >
              {this.state.oldNoteText}
            </AppText>
          )}
        </View>
      </View>
    );
  }
}
