import React, { useState, useEffect } from "react";
import {
  InteractionManager,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";

import reactStringReplace from "react-string-replace";

import bookPaths from "../json/bible/Bible";

import { useTheme } from "../config/ThemeProvider";

import BibleScreenToolBar from "../components/BibleScreenToolBar";
import verseFormatted from "../components/VerseFormatted";
import ParagraphBible from "../components/ParagraphBible";
import VerseByVerseBible from "../components/VerseByVerseBible";

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
  crossrefSize,
  bottomSheetRef,
  paragraphBibleRef,
  searchHistoryRef,
  setCurrentBook,
  setSettingsMode,
  setVerseList,
  topPanel,
  verseList,
}) {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    changeBibleBook({
      label: "I John",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    });
  }, []);

  const notesArray = JSON.parse(
    JSON.stringify(require("../json/bible/esvmsb.notes.json"))
  )["crossway-studynotes"]["book"];

  var crossrefsJsonObject = JSON.parse(
    JSON.stringify(require("../json/bible/GenesisCrossrefs.json"))
  )["book"];

  const [sections, setSections] = useState([]);
  // const [currentBook, setCurrentBook] = useState(books[0]);
  const [currentChapter] = useState(1);
  const [currentVerse] = useState(1);
  // const [bookNotes, setBookNotes] = useState([]);

  // const { landscape } = useDeviceOrientation();
  const [] = useState(true);
  const { height } = Dimensions.get("window");
  // const [focusedVerse, setFocusedVerse] = useState(null);

  const changeBibleBook = (newBook) => {
    setCurrentBook(newBook);
    var bibleJsonString = JSON.stringify(bookPaths[newBook.label]);
    var bibleJsonObject = JSON.parse(bibleJsonString);

    let verses = [];
    let johnsNote = "";
    let crossrefs = "";
    const chapters = bibleJsonObject["crossway-bible"]["book"]["chapter"];
    const notes = notesArray[newBook.value - 1]["note"];

    const bookSections = [];
    chapters.map((chapter) => {
      chapter["verse"].forEach((verse) => {
        let note = notes.find(
          (el) =>
            el["_start"] ===
            "n" +
              "01" +
              ("000" + chapter["_num"]).substr(-3) +
              ("000" + verse["_num"]).substr(-3)
        );

        if (note) {
          const pTag = note["content"]["p"][0];
          const parsedNote = pTag["a"]
            ? reactStringReplace(pTag["__text"], /\n/g, (match, i) => (
                <Text key={i}>
                  <Text style={{ fontSize: crossrefSize, lineHeight: 10 }}>
                    {Array.isArray(pTag["a"])
                      ? "REF1" //pTag["a"][0]["__text"] //"a" is always an array
                      : "REF2"}
                  </Text>
                  {match}
                </Text>
              ))
            : reactStringReplace(pTag["__text"], /\n/, (match, i) => (
                <Text key={i}>{"REF3"}</Text>
              ));
          johnsNote = parsedNote;
        } else {
          johnsNote = "There is no note for this passage";
        }

        let crossrefList = crossrefsJsonObject["chapter"][
          Number(chapter["_num"]) - 1
        ]["verse"].find(
          (el) =>
            el["id"] ===
            "01" +
              ("000" + chapter["_num"]).substr(-3) +
              ("000" + verse["_num"]).substr(-3)
        );

        if (crossrefList) {
          crossrefs = crossrefList["letter"];
        } else {
          crossrefs = {
            title: "",
            text: "",
          };
        }

        verses.push({
          chapter: Number(chapter["_num"]),
          title: Number(verse["_num"]),
          content: verseFormatted(verse, crossrefSize),
          johnsNote: johnsNote,
          // loved: false,
          crossrefs: crossrefs,
        });
      });

      Array.isArray(chapter["heading"])
        ? bookSections.push({
            chapterNum: Number(chapter["_num"]),
            title: chapter["heading"][0],
            data: chapter["verse"],
          })
        : bookSections.push({
            chapterNum: Number(chapter["_num"]),
            title: chapter["heading"],
            data: chapter["verse"],
          });
    });
    setSections(bookSections);
    setVerseList(verses);
  };

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
      crossrefSize={crossrefSize}
      darkMode={darkMode}
      fontFamily={fontFamily}
      fontSize={fontSize}
      HEADER_HEIGHT={HEADER_HEIGHT}
      ref={paragraphBibleRef}
      sections={sections}
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
        changeBibleBook={changeBibleBook}
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
