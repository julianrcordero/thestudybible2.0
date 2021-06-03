import React, { useState, useEffect, Component } from "react";
import { InteractionManager, View } from "react-native";

import userMarkupApi from "../api/userMarkup";
import { useTheme } from "../config/ThemeProvider";

import ToolBar from "../components/ToolBar";
import ParagraphBible from "../components/ParagraphBible";
import useAuth from "../auth/useAuth";
import VerseByVerseBible from "../components/VerseByVerseBible";

import defaultStyles from "../config/styles";
import RecyclerListBible from "../components/RecyclerListBible";
import VerseBible from "../components/VerseBible";
import { useStickyHeader } from "react-use-sticky-header";

export default class BibleScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentBook: "Ecclesiastes",
    currentChapter: 1,
    currentVerse: 1,
    fontSize: 18,
    fontFamily: "Avenir",
    formatting: "Default",
  };

  //Bible Screen
  // componentDidMount() {
  //   let currentBook = this.state.currentBook;
  //   this.props.topPanel.current.changeBibleBook(currentBook);
  // }

  //Study Screen
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentBook.label !== this.state.currentBook.label) {
  //     let verses = this.props.topPanel.current.changeStudyScreenBook(
  //       this.state.currentBook
  //     );

  //     this.props.studyScreen.current.setState({
  //       bookFilter: this.state.currentBook.value,
  //       currentBook: this.state.currentBook,
  //       verseList: verses,
  //     });

  //     // this.props.paragraphBibleRef.current.setState({ verses: verses });
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentBook !== nextState.currentBook) {
      return true;
    } else if (this.state.currentChapter !== nextState.currentChapter) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.fontSize !== nextState.fontSize) {
      return true;
    } else if (this.state.fontFamily !== nextState.fontFamily) {
      return true;
    } else if (this.props.headerY !== nextProps.headerY) {
      console.log("scrollY different");
      return true;
    }
    return false;
  }

  toggleSlideView = (chapter, verse) => {
    this.props.headerContentRef.current.setState({ settingsMode: false });
    this.props.bottomSheetContentRef.current.setState({ settingsMode: false });

    let studyScreen = this.props.studyScreen.current;
    let topPanel = this.props.topPanel.current;
    if (studyScreen.state.verseList.length === 0) {
      console.log("setting study screen now to", topPanel.state.verses.length);
      studyScreen.setState({
        currentBook: topPanel.state.currentBook,
        verseList: topPanel.state.verses,
      });
    }

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.props.topPanel.current.state.verses.findIndex(
        (obj) => obj.chapter === chapter && obj.verse === verse
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

  render() {
    const {
      bibleScreen,
      bibleSectionsRef,
      bottomSheetContentRef,
      colors,
      darkMode,
      headerContentRef,
      HEADER_HEIGHT,
      headerOpacity,
      scrollY,
      headerY,
      bottomSheetRef,
      paragraphBibleRef,
      searchHistoryRef,
      toolBar,
      topPanel,
    } = this.props;

    return (
      <>
        <ToolBar
          bottomSheetContentRef={bottomSheetContentRef}
          bottomSheetRef={bottomSheetRef}
          colors={colors}
          currentBook={this.state.currentBook}
          currentChapter={this.state.currentChapter}
          currentVerse={this.state.currentVerse}
          darkMode={darkMode}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          headerContentRef={headerContentRef}
          headerOpacity={headerOpacity}
          headerY={headerY}
          HEADER_HEIGHT={HEADER_HEIGHT}
          paragraphBibleRef={paragraphBibleRef}
          ref={toolBar}
          searchHistoryRef={searchHistoryRef}
          toolBar={toolBar}
          topPanel={topPanel}
        />
        <ParagraphBible
          bibleScreen={bibleScreen}
          bibleSectionsRef={bibleSectionsRef}
          colors={colors}
          darkMode={darkMode}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          paragraphBibleRef={paragraphBibleRef}
          HEADER_HEIGHT={HEADER_HEIGHT}
          ref={paragraphBibleRef}
          scrollY={scrollY}
          // toggleSlideView={this.toggleSlideView}
          topPanel={topPanel}
        />
      </>
    );
  }
}
