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
    currentBook: {
      label: "Genesis",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    },
    currentChapter: 1,
    currentVerse: 1,
    fontSize: 16,
    fontFamily: "Avenir",
    formatting: "Default",
  };

  componentDidMount() {
    let currentBook = this.state.currentBook;
    console.log("setting BibleScreen to", currentBook.label);
    this.props.topPanel.current.changeBibleBook(currentBook);
  }

  toggleSlideView = (chapter, verse) => {
    // this.props.setSettingsMode(false);
    this.props.bottomSheetContentRef.current.setState({ settingsMode: false });
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.props.verseList.findIndex(
        (obj) => obj.chapter === chapter && obj.title === verse
      );
      setTimeout(() => {
        this.props.bottomSheetRef.current.snapTo(0);
        // this.props.carousel.current.scrollToIndex({
        //   animated: false,
        //   index: myIndex,
        // });
      });
    });
    () => interactionPromise.cancel();
  };

  render() {
    const {
      bottomSheetContentRef,
      carousel,
      colors,
      darkMode,
      HEADER_HEIGHT,
      scrollY,
      headerY,
      // crossrefSize,
      bottomSheetRef,
      paragraphBibleRef,
      searchHistoryRef,
      sections,
      topPanel,
      verseList,
    } = this.props;

    return (
      <>
        <BibleScreenToolBar
          bottomSheetContentRef={bottomSheetContentRef}
          HEADER_HEIGHT={HEADER_HEIGHT}
          headerY={headerY}
          currentBook={this.state.currentBook}
          currentChapter={this.state.currentChapter}
          currentVerse={this.state.currentVerse}
          darkMode={darkMode}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          bottomSheetRef={bottomSheetRef}
          paragraphBibleRef={paragraphBibleRef}
          topPanel={topPanel}
          searchHistoryRef={searchHistoryRef}
        />
        <ParagraphBible
          colors={colors}
          // crossrefSize={crossrefSize}
          darkMode={darkMode}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          HEADER_HEIGHT={HEADER_HEIGHT}
          ref={paragraphBibleRef}
          scrollY={scrollY}
          toggleSlideView={this.toggleSlideView}
        />
      </>
    );
  }
}
