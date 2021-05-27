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

  const { gridChapters } = route?.params;

  const chapterNum = gridChapters ?? chapters;
  const DATA = [];

  for (let i = 1; i <= chapterNum; i++) {
    DATA.push(i);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => changeBook(item)}>
      <BiblePickerItem
        backgroundColor={"#FFFB79"}
        label={item}
        flex={1 / 7}
        textColor={colors.text}
      />
    </TouchableOpacity>
  );

  const changeTopPanelBook = () => {
    topPanel.current?.changeBibleBook({
      label: route?.params.title,
      value: route?.params.value, //
      backgroundColor: "#345171",
      icon: "apps",
    });
  };

  const changeBook = (chapter) => {
    topPanel.current.setState({ collapsed: true });
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(changeTopPanelBook);

      // paragraphBibleRef.current?.scrollToOffset(chapter - 1);
      // paragraphBibleRef.current?.scrollByIndex(chapter - 1);
      paragraphBibleRef.current?.setState({ index: chapter - 1 });
    });
    () => interactionPromise.cancel();
  };

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const keyExtractor = (item) => item;

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
