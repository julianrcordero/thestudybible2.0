import React, { Component, useState } from "react";
import { Text, View } from "react-native";

import NoteHistoryItem from "./NoteHistoryItem";
import { useTheme } from "../config/ThemeProvider";

export default class NoteHistory extends Component {
  // const { colors, isDark } = useTheme();

  state = {
    noteHistory: [
      {
        content: "Sample note",
        content_format: "html",
        created: "2018-02-01T22:29:49.738Z",
        id: 4782937,
        modified: "2018-02-01T23:00:24.047Z",
        refs: [
          {
            end_ref: 45012021,
            start_ref: 45012021,
          },
        ],
        resource_uri:
          "/GetObjectByUsernameTypeId/jcordero@gty.org/note/4782937",
      },
    ],
  };

  addANote = () => {
    const newNoteHistory = [
      {
        id: this.state.noteHistory.length,
        title: "Today at 3:15pm",
        description: "",
        open: true,
      },
      ...this.state.noteHistory,
    ];
    this.setState({ noteHistory: newNoteHistory });
  };

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.state.noteHistory.filter((m) => m.id !== item.id);

    this.setState({
      noteHistory: newList,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notes !== this.props.notes)
      this.setState({ noteHistory: this.props.notes });
  }

  render() {
    const { carousel, colors } = this.props;

    return this.state.noteHistory.map((item) => (
      <NoteHistoryItem
        carousel={carousel}
        colors={colors}
        key={item.id.toString()}
        handleDelete={() => this.handleDelete(item)}
        date={item.created}
        subTitle={item.content}
        onPress={() => console.log(item)}
        open={item.open}
      />
    ));
  }
}
