import React, { PureComponent, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import bookPaths from "../json/Bible";
const { height, width } = Dimensions.get("window");
import { List } from "immutable";

import BiblePickerItem from "../components/BiblePickerItem";
import { useTheme } from "../config/ThemeProvider";
import { ImmutableVirtualizedList } from "react-native-immutable-list-view";

export default function ChaptersGridScreen({
  chapters,
  route,
  bibleScreen,
  paragraphBibleRef,
  topPanel,
  value,
}) {
  useEffect(() => {
    let title = route?.params.title;

    paragraphBibleRef.current?.setState({ bookTitle: title });
    console.log("loaded ChaptersGridScreen and changed book to", title);

    bibleScreen.current?.setState({
      currentBook: bookPaths[title]["crossway-bible"].book["@title"],
    });
  }, []);

  const { colors } = useTheme();

  const { gridChapters } = route?.params;

  const chapterNum = gridChapters ?? chapters;
  const DATA = []; //Immutable.Range(1, chapterNum);

  for (let i = 1; i <= chapterNum; i++) {
    DATA.push(i);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectChapter(item)} style={{}}>
      <BiblePickerItem
        backgroundColor={"#FFFB79"}
        label={item}
        flex={1 / 7}
        textColor={colors.text}
      />
    </TouchableOpacity>
  );

  const selectChapter = (chapter) => {
    topPanel.current?.setState({ collapsed: true });
    let chapterIndex = chapter - 1;
    let paragraphBible = paragraphBibleRef.current;

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        // topPanel.current?.setSections(chapterIndex);
        paragraphBible?.scrollByIndex(0);
        paragraphBible?.setState({ startIndex: chapterIndex });
      }, 0);
    });
    () => interactionPromise.cancel();
  };

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const keyExtractor = (item, index) => index.toString();

  const viewStyle = { backgroundColor: colors.background, width: width - 30 };

  const getItemLayout = (data, index) => ({
    length: (width - 30) / 7,
    offset: (width - 30) * index,
    index,
  });

  return (
    <FlatList
      data={DATA}
      keyExtractor={keyExtractor}
      numColumns={7}
      renderItem={renderItem}
      columnWrapperStyle={columnWrapperStyle}
      showsVerticalScrollIndicator={false}
      style={viewStyle}
    />
    // <ImmutableVirtualizedList
    //   getItemLayout={getItemLayout}
    //   immutableData={DATA}
    //   keyExtractor={keyExtractor}
    //   numColumns={7}
    //   renderItem={renderItem}
    //   columnWrapperStyle={columnWrapperStyle}
    //   showsVerticalScrollIndicator={false}
    // />
  );
}
