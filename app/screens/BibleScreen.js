import React, { useState, useEffect } from "react";
import { InteractionManager } from "react-native";

import userMarkupApi from "../api/userMarkup";
import { useTheme } from "../config/ThemeProvider";

import BibleScreenToolBar from "../components/BibleScreenToolBar";
import ParagraphBible from "../components/ParagraphBible";
import useAuth from "../auth/useAuth";

export default function BibleScreen({
  formatting,
  carousel,
  currentBook,
  darkMode,
  HEADER_HEIGHT,
  scrollY,
  headerY,
  fontFamily,
  fontSize,
  // crossrefSize,
  bottomSheetRef,
  paragraphBibleRef,
  searchHistoryRef,
  sections,
  setSettingsMode,
  topPanel,
  verseList,
}) {
  const { colors } = useTheme();

  useEffect(() => {
    topPanel.current.changeBibleBook({
      label: "Genesis",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    });
  }, []);

  const [currentChapter] = useState(1);
  const [currentVerse] = useState(1);

  // const [focusedVerse, setFocusedVerse] = useState(null);
  // const [bookNotes, setBookNotes] = useState([]);
  // const { landscape } = useDeviceOrientation();

  const toggleSlideView = (chapter, verse) => {
    setSettingsMode(false);
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = verseList.findIndex(
        (obj) => obj.chapter === chapter && obj.title === verse
      );
      setTimeout(() => {
        bottomSheetRef.current.snapTo(0);
        carousel.current.scrollToIndex({ animated: false, index: myIndex });
      });
    });
    () => interactionPromise.cancel();
  };

  let paragraphBible = (
    <ParagraphBible
      colors={colors}
      formatting={formatting}
      // crossrefSize={crossrefSize}
      darkMode={darkMode}
      fontFamily={fontFamily}
      fontSize={fontSize}
      HEADER_HEIGHT={HEADER_HEIGHT}
      ref={paragraphBibleRef}
      scrollY={scrollY}
      toggleSlideView={toggleSlideView}
    />
  );

  // let verseByVerseBible = (
  //   <VerseByVerseBible
  //     crossrefSize={crossrefSize}
  //     // fontSize={fontSize}
  //     HEADER_HEIGHT={HEADER_HEIGHT}
  //     // ref={paragraphBibleRef}
  //     sections={sections}
  //     scrollY={scrollY}
  //     toggleSlideView={toggleSlideView}
  //   />
  // );

  return (
    <>
      <BibleScreenToolBar
        HEADER_HEIGHT={HEADER_HEIGHT}
        headerY={headerY}
        currentBook={currentBook}
        currentChapter={currentChapter}
        currentVerse={currentVerse}
        darkMode={darkMode}
        fontFamily={fontFamily}
        fontSize={fontSize}
        // setFontSize={setFontSize}
        bottomSheetRef={bottomSheetRef}
        paragraphBibleRef={paragraphBibleRef}
        setSettingsMode={setSettingsMode}
        topPanel={topPanel}
        searchHistoryRef={searchHistoryRef}
      />

      {/* <TextInput
        style={{ height: 40 }}
        placeholder="TYPE HERE"
        onChangeText={(text) => setSearchWords([text])}
      /> */}
      {paragraphBible}
    </>
  );
}
