import React, { Component } from "react";
import { Text, View } from "react-native";

import NoteHistoryItem from "./NoteHistoryItem";
import { useTheme } from "../config/ThemeProvider";

export default class NoteHistory extends Component {
  // const { colors, isDark } = useTheme();

  // const listEmptyComponent = () => (
  //   <View
  //     style={{
  //       // borderWidth: 1,
  //       height: 50,
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Text>No note history</Text>
  //   </View>
  // );

  state = {
    noteHistory: [
      {
        id: 2,
        title: "Today at 11:23am",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 1,
        title: "December 22, 2020 at 5:00pm",
        description: "The quick brown fox jumps over the lazy dog.",
      },
      {
        id: 0,
        title: "July 8, 2020 at 10:00am",
        description: "Here is a sample sentence of a note that I have written.",
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

  render() {
    const { carousel, colors } = this.props;

    return this.state.noteHistory.map((item) => (
      <NoteHistoryItem
        carousel={carousel}
        colors={colors}
        key={item.id.toString()}
        handleDelete={() => this.handleDelete(item)}
        date={item.title}
        subTitle={item.description}
        onPress={() => console.log(item)}
        open={item.open}
      />
    ));
  }
}
