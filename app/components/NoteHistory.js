import React, { Component, useState } from "react";
import { Text, View } from "react-native";

import NoteHistoryItem from "./NoteHistoryItem";
import { useTheme } from "../config/ThemeProvider";
import useAuth from "../auth/useAuth";

export default class NoteHistory extends Component {
  // const { colors, isDark } = useTheme();

  state = {
    notes: [],
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
      ...this.state.notes,
    ];
    this.setState({ notes: newNoteHistory });
  };

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.props.notes.filter((m) => m.id !== item.id);

    this.setState({
      notes: newList,
    });

    const newCache = this.props.currentNotes.filter((n) => n.id !== item.id);
    this.props.setCurrentNotes(newCache);
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.notes !== this.props.notes)
    //   this.setState({ notes: this.props.notes });

    if (this.props.notes.length > 0 || this.state.notes.length > 0) {
      if (
        prevState.notes !== this.props.notes &&
        this.props.notes !== this.state.notes
      ) {
        this.setState({ notes: this.props.notes });
      }
    }
  }

  render() {
    const {
      colors,
      currentNotes,
      referenceFilter,
      setCurrentNotes,
      user,
    } = this.props;

    return this.state.notes
      .sort((a, b) => a.created < b.created)
      .map((item) => (
        <NoteHistoryItem
          colors={colors}
          currentNotes={currentNotes}
          handleDelete={() => this.handleDelete(item)}
          key={item.id.toString()}
          item={item}
          referenceFilter={referenceFilter}
          setCurrentNotes={setCurrentNotes}
          user={user}

          // date={item.created}
          // open={item.open}
          // subTitle={item.content}
        />
      ));
  }
}
