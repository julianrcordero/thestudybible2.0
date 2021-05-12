import React, { PureComponent, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
const { height, width } = Dimensions.get("window");

import BiblePickerItem from "../components/BiblePickerItem";
import { useTheme } from "../config/ThemeProvider";

export default function ChaptersGridScreen({
  chapters,
  paragraphBibleRef,
  route,
  topPanel,
}) {
  const { colors } = useTheme();

  const { gridChapters } = route ? route.params : 0;

  const chapterNum = gridChapters ?? chapters;
  const DATA = [];

  for (let i = 0; i < chapterNum; i++) {
    DATA.push({
      id: i,
      backgroundColor: "#FFFB79",
      title: i + 1,
      short: i + 1,
    });
  }

  const changeBook = (chapter) => {
    topPanel.current.setState({ collapsed: true });
    topPanel.current.changeBibleBook({
      label: route.params.title,
      value: chapter,
      backgroundColor: "#345171",
      icon: "apps",
    });
    paragraphBibleRef.current.setState({
      index: chapter - 1,
      initialScrollIndex: chapter - 1,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => changeBook(item.title)}>
      <BiblePickerItem
        item={item}
        label={item.short}
        flex={1 / 7}
        textColor={colors.text}
      />
    </TouchableOpacity>
  );

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const keyExtractor = (item) => item.id;

  return (
    <View style={[{ backgroundColor: colors.background, width: width - 30 }]}>
      <FlatList
        data={DATA}
        keyExtractor={keyExtractor}
        numColumns={7}
        renderItem={renderItem}
        columnWrapperStyle={columnWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
