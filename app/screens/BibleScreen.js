import React, { useState, useEffect, Component } from "react";
import { InteractionManager } from "react-native";

import userMarkupApi from "../api/userMarkup";
import { useTheme } from "../config/ThemeProvider";

import BibleScreenToolBar from "../components/BibleScreenToolBar";
import ParagraphBible from "../components/ParagraphBible";
import useAuth from "../auth/useAuth";

export default class BibleScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentChapter: 1,
    currentVerse: 1,
  };

  componentDidMount() {
    console.log("useEffect BibleScreen A");
    this.props.topPanel.current.changeBibleBook({
      label: "Genesis",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    });
    console.log("useEffect BibleScreen B");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate BibleScreen");
  }

  toggleSlideView = (chapter, verse) => {
    this.props.setSettingsMode(false);
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.props.verseList.findIndex(
        (obj) => obj.chapter === chapter && obj.title === verse
      );
      setTimeout(() => {
        this.props.bottomSheetRef.current.snapTo(0);
        this.props.carousel.current.scrollToIndex({
          animated: false,
          index: myIndex,
        });
      });
    });
    () => interactionPromise.cancel();
  };

  bibleScreenToolBar = (
    <BibleScreenToolBar
      HEADER_HEIGHT={this.props.HEADER_HEIGHT}
      headerY={this.props.headerY}
      currentBook={
        this.props.topPanel.current
          ? this.props.topPanel.current.state.currentBook
          : "Placeholder"
      }
      currentChapter={this.state.currentChapter}
      currentVerse={this.state.currentVerse}
      darkMode={this.props.darkMode}
      fontFamily={this.props.fontFamily}
      fontSize={this.props.fontSize}
      // setFontSize={setFontSize}
      bottomSheetRef={this.props.bottomSheetRef}
      paragraphBibleRef={this.props.paragraphBibleRef}
      setSettingsMode={this.props.setSettingsMode}
      topPanel={this.props.topPanel}
      searchHistoryRef={this.props.searchHistoryRef}
    />
  );

  paragraphBible = (
    <ParagraphBible
      colors={this.props.colors}
      formatting={this.props.formatting}
      // crossrefSize={crossrefSize}
      darkMode={this.props.darkMode}
      fontFamily={this.props.fontFamily}
      fontSize={this.props.fontSize}
      HEADER_HEIGHT={this.props.HEADER_HEIGHT}
      ref={this.props.paragraphBibleRef}
      scrollY={this.props.scrollY}
      toggleSlideView={this.toggleSlideView}
    />
  );

  render() {
    const {
      formatting,
      carousel,
      colors,
      // currentBook,
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
    } = this.props;

    return (
      <>
        {this.bibleScreenToolBar}
        {this.paragraphBible}
      </>
    );
  }
}

// export default function BibleScreen({
//   formatting,
//   carousel,
//   colors,
//   // currentBook,
//   darkMode,
//   HEADER_HEIGHT,
//   scrollY,
//   headerY,
//   fontFamily,
//   fontSize,
//   // crossrefSize,
//   bottomSheetRef,
//   paragraphBibleRef,
//   searchHistoryRef,
//   sections,
//   setSettingsMode,
//   topPanel,
//   verseList,
// }) {
//   useEffect(() => {
//     console.log("useEffect BibleScreen A");
//     topPanel.current.changeBibleBook({
//       label: "Genesis",
//       value: 1,
//       backgroundColor: "#345171",
//       icon: "apps",
//     });
//     console.log("useEffect BibleScreen B");
//   }, []);

//   const [currentChapter] = useState(1);
//   const [currentVerse] = useState(1);

//   // const [focusedVerse, setFocusedVerse] = useState(null);
//   // const [bookNotes, setBookNotes] = useState([]);
//   // const { landscape } = useDeviceOrientation();

//   const toggleSlideView = (chapter, verse) => {
//     setSettingsMode(false);
//     const interactionPromise = InteractionManager.runAfterInteractions(() => {
//       let myIndex = verseList.findIndex(
//         (obj) => obj.chapter === chapter && obj.title === verse
//       );
//       setTimeout(() => {
//         bottomSheetRef.current.snapTo(0);
//         carousel.current.scrollToIndex({ animated: false, index: myIndex });
//       });
//     });
//     () => interactionPromise.cancel();
//   };

//   let paragraphBible = (
//     <ParagraphBible
//       colors={colors}
//       formatting={formatting}
//       // crossrefSize={crossrefSize}
//       darkMode={darkMode}
//       fontFamily={fontFamily}
//       fontSize={fontSize}
//       HEADER_HEIGHT={HEADER_HEIGHT}
//       ref={paragraphBibleRef}
//       scrollY={scrollY}
//       toggleSlideView={toggleSlideView}
//     />
//   );

//   // let verseByVerseBible = (
//   //   <VerseByVerseBible
//   //     crossrefSize={crossrefSize}
//   //     // fontSize={fontSize}
//   //     HEADER_HEIGHT={HEADER_HEIGHT}
//   //     // ref={paragraphBibleRef}
//   //     sections={sections}
//   //     scrollY={scrollY}
//   //     toggleSlideView={toggleSlideView}
//   //   />
//   // );

//   return (
//     <>
//       <BibleScreenToolBar
//         HEADER_HEIGHT={HEADER_HEIGHT}
//         headerY={headerY}
//         // currentBook={currentBook}
//         currentChapter={currentChapter}
//         currentVerse={currentVerse}
//         darkMode={darkMode}
//         fontFamily={fontFamily}
//         fontSize={fontSize}
//         // setFontSize={setFontSize}
//         bottomSheetRef={bottomSheetRef}
//         paragraphBibleRef={paragraphBibleRef}
//         setSettingsMode={setSettingsMode}
//         topPanel={topPanel}
//         searchHistoryRef={searchHistoryRef}
//       />

//       {/* <TextInput
//         style={{ height: 40 }}
//         placeholder="TYPE HERE"
//         onChangeText={(text) => setSearchWords([text])}
//       /> */}
//       {paragraphBible}
//     </>
//   );
// }
