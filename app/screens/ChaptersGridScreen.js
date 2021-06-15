import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  TouchableOpacity,
} from "react-native";
import bookPaths from "../json/Bible";
const { width } = Dimensions.get("window");

import BiblePickerItem from "../components/BiblePickerItem";
import { useTheme } from "../config/ThemeProvider";

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

    let paragraphBible = paragraphBibleRef.current;
    paragraphBible?.setState({
      bookTitle: title,
      startChapter: 0,
      timesUpdated: 0,
    });
    paragraphBible._heights = [];
    console.log("loaded ChaptersGridScreen and changed book to", title);

    bibleScreen.current?.setState({
      currentBook: title, //bookPaths[title].getIn(["crossway-bible", "book", "@title"]),
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
    <BiblePickerItem
      backgroundColor={"#FFFB79"}
      label={item}
      onPress={() => selectChapter(item)}
      textColor={colors.text}
    />
  );

  const selectChapter = (chapter) => {
    // console.log("clicked on chapter", chapter);
    topPanel.current?.setState({ collapsed: true });
    let paragraphBible = paragraphBibleRef.current;

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      paragraphBible?.setState({ startChapter: chapter });
    });
    () => interactionPromise.cancel();
    bibleScreen.current?.setState({
      currentChapter: chapter,
    });
  };

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const keyExtractor = (item, index) => index.toString();

  const viewStyle = { backgroundColor: colors.background, width: width - 30 };

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
  );
}
