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
import userMarkup from "../api/userMarkup";
import moment from "moment";

import Button from "./Button";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";

export default class NoteHistoryItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: this.props.item.open ?? false,
    noteText: this.props.item.content,
    oldNoteText: this.props.item.content,
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

    if (this.props.item.id > 0) this.deleteNote(this.props.item.id);
  };

  save = () => {
    if (this.state.noteText == "") {
      this.props.handleDelete();
      return;
    }

    this.setFocusedFalse();

    this.setState({ oldNoteText: this.state.noteText });

    this.props.item.id > 0
      ? this.updateNote(this.state.noteText)
      : this.insertNote(this.state.noteText);
  };

  insertNote = async (noteText) => {
    // setProgress(0);
    // setUploadVisible(true);
    const result = await userMarkup.addUserMarkup(
      {
        content: noteText,
        refs: [
          {
            end_ref: this.props.referenceFilter,
            start_ref: this.props.referenceFilter,
          },
        ],
      },
      this.props.user.sub,
      "note"
      // markup, username, type,
      // (progress) => setProgress(progress)
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return alert("Could not create the note.");
    } else {
      console.log("created note with id:", result.data);
    }

    // resetForm();
  };

  updateNote = async (noteText) => {
    // setProgress(0);
    // setUploadVisible(true);
    const result = await userMarkup.editUserMarkup(
      {
        content: noteText,
        id: this.props.item.id,
        refs: [
          {
            end_ref: this.props.referenceFilter,
            start_ref: this.props.referenceFilter,
          },
        ],
      },
      this.props.user.sub,
      "note"
      // markup, username, type,
      // (progress) => setProgress(progress)
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return alert("Could not update the note.");
    } else {
      console.log("updated note with id:", this.props.item.id);
    }

    // resetForm();
  };

  deleteNote = async (noteText) => {
    // setProgress(0);
    // setUploadVisible(true);
    const result = await userMarkup.deleteUserMarkup(
      this.props.item.id,
      this.props.user.sub,
      "note"
      // markup, username, type,
      // (progress) => setProgress(progress)
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return alert("Could not delete the note.");
    } else {
      console.log("deleted note with id:", this.props.item.id);
    }

    // resetForm();
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
    const { colors, item } = this.props;
    var dateFormat = require("dateformat");

    const DismissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={this.notFinishedAlert}>
        {children}
      </TouchableWithoutFeedback>
    );

    return (
      <View style={this.styles.container}>
        <Text style={[this.styles.date, { color: colors.primary }]}>
          {dateFormat(item.date, "dddd mm-dd-yy, h:MMtt")}
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
