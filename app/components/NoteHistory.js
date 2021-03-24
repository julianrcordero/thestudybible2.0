import React, { Component, useState } from "react";
import { Text, View } from "react-native";

import NoteHistoryItem from "./NoteHistoryItem";
import { useTheme } from "../config/ThemeProvider";
import useAuth from "../auth/useAuth";

export default class NoteHistory extends Component {
  // const { colors, isDark } = useTheme();

  state = {
    noteHistory: [
      // {
      //   content: "Sample note",
      //   content_format: "html",
      //   created: "2018-02-01T22:29:49.738Z",
      //   id: 4782937,
      //   modified: "2018-02-01T23:00:24.047Z",
      //   refs: [
      //     {
      //       end_ref: 45012021,
      //       start_ref: 45012021,
      //     },
      //   ],
      //   resource_uri:
      //     "/GetObjectByUsernameTypeId/jcordero@gty.org/note/4782937",
      // },
    ],
  };

  addANote = () => {
    const newNoteHistory = [
      {
        content: "Sample note",
        id: 0,
        open: true,
        refs: [
          {
            end_ref: 45012021,
            start_ref: 45012021,
          },
        ],
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
    const { colors, referenceFilter, user } = this.props;

    return this.state.noteHistory
      .sort((a, b) => a.created < b.created)
      .map((item) => (
        <NoteHistoryItem
          colors={colors}
          handleDelete={() => this.handleDelete(item)}
          key={item.id.toString()}
          item={item}
          referenceFilter={referenceFilter}
          user={user}

          // date={item.created}
          // open={item.open}
          // subTitle={item.content}
        />
      ));
  }
}
