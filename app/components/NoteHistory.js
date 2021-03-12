import React from "react";
import { Text, View } from "react-native";

import NoteHistoryItem from "./NoteHistoryItem";
import { useTheme } from "../config/ThemeProvider";

export default function NoteHistory({ carousel, noteHistory, handleDelete }) {
  const { colors, isDark } = useTheme();

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

  return noteHistory.map((item) => (
    <NoteHistoryItem
      carousel={carousel}
      colors={colors}
      key={item.id.toString()}
      handleDelete={() => handleDelete(item)}
      date={item.title}
      subTitle={item.description}
      onPress={() => console.log(item)}
      open={item.open}
    />
  ));
}
