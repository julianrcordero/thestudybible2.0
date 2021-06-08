import React, { PureComponent, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import bookPaths from "../json/Bible";
const { height, width } = Dimensions.get("window");

import BiblePickerItem from "../components/BiblePickerItem";
import { useTheme } from "../config/ThemeProvider";

export default function ChaptersGridScreen({
  chapters,
  route,
  // bibleScreen,
  paragraphBibleRef,
  topPanel,
  value,
}) {
  useEffect(() => {
    let title = route?.params.title;

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // setTimeout(() => {
      // paragraphBibleRef.current?.setState({
      //   partialSections: bookPaths[title]["crossway-bible"].book.chapter,
      // });

      topPanel.current?.setState({
        currentBook: bookPaths[title]["crossway-bible"].book,
      });
      // });
    });
    () => interactionPromise.cancel();
  }, []);

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

  // const changeTopPanelBook = (chapterIndex) => {
  //   let newBook = {
  //     label: route?.params.title,
  //     value: route?.params.value ?? value, //
  //     backgroundColor: "#345171",
  //     icon: "apps",
  //   };
  //   topPanel.current?.setSections(chapterIndex);
  // };

  const changeBook = (chapter) => {
    topPanel.current?.setState({ collapsed: true });
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let chapterIndex = chapter - 1;
      setTimeout(() => {
        topPanel.current?.setSections(chapterIndex);
        // paragraphBibleRef.current?.setState({ index: chapterIndex });
      });
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
