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

  for (let i = 1; i <= chapterNum; i++) {
    DATA.push({
      chapter: i,
    });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => changeBook(item.chapter)}>
      <BiblePickerItem
        backgroundColor={"#FFFB79"}
        label={item.chapter}
        flex={1 / 7}
        textColor={colors.text}
      />
    </TouchableOpacity>
  );

  const changeBook = (chapter) => {
    topPanel.current.setState({ collapsed: true });
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        topPanel.current?.changeBibleBook({
          label: route.params.title,
          value: chapter,
          backgroundColor: "#345171",
          icon: "apps",
        });
        // paragraphBibleRef.current?.scrollToOffset(chapter - 1);
        // paragraphBibleRef.current?.scrollByIndex(chapter - 1);
        paragraphBibleRef.current?.setState({ index: chapter });
      });
    });
    () => interactionPromise.cancel();
  };

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const keyExtractor = (item) => item.chapter;

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
