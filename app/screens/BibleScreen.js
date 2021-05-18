import React, { useState, useEffect, Component } from "react";
import { InteractionManager, View } from "react-native";

import userMarkupApi from "../api/userMarkup";
import { useTheme } from "../config/ThemeProvider";

import BibleScreenToolBar from "../components/BibleScreenToolBar";
import ParagraphBible from "../components/ParagraphBible";
import useAuth from "../auth/useAuth";
import VerseByVerseBible from "../components/VerseByVerseBible";

import defaultStyles from "../config/styles";

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
    fontSize: 18,
    fontFamily: "Avenir",
    formatting: "Default",
  };

  //Bible Screen
  componentDidMount() {
    let currentBook = this.state.currentBook;
    this.props.topPanel.current.changeBibleBook(currentBook);
  }

  //Study Screen
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentBook.label !== this.state.currentBook.label) {
      let verses = this.props.topPanel.current.changeStudyScreenBook(
        this.state.currentBook
      );

      this.props.studyScreen.current.setState({
        bookFilter: this.state.currentBook.value,
        currentBook: this.state.currentBook,
        verseList: verses,
      });

      this.props.paragraphBibleRef.current.setState({ verses: verses });
    }
  }

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
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.props.studyScreen.current.state.verseList.findIndex(
        (obj) => obj.chapter === chapter && obj.title === verse
      );

      // this.props.verseList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
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
      carousel,
      colors,
      darkMode,
      headerContentRef,
      HEADER_HEIGHT,
      scrollY,
      headerY,
      bottomSheetRef,
      paragraphBibleRef,
      searchHistoryRef,
      topPanel,
    } = this.props;

    return (
      <>
        <BibleScreenToolBar
          bottomSheetContentRef={bottomSheetContentRef}
          colors={colors}
          headerContentRef={headerContentRef}
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
        {/* <VerseByVerseBible
          bibleSectionsRef={bibleSectionsRef}
          colors={colors}
          darkMode={darkMode}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          HEADER_HEIGHT={HEADER_HEIGHT}
          ref={paragraphBibleRef}
          scrollY={scrollY}
          toggleSlideView={this.toggleSlideView}
          topPanel={topPanel}
        /> */}
        {/* <View style={defaultStyles.paddingText}> */}
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
        {/* </View> */}
      </>
    );
  }
}
