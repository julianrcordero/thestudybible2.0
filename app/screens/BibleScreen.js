import React, { Component } from "react";
import { InteractionManager } from "react-native";

import ToolBar from "../components/ToolBar";
// import ParagraphBible from "../components/ParagraphBible";
import RecyclerListBible from "../components/RecyclerListBible";

export default class BibleScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentBook: "Psalms",
    currentChapter: 1,
    currentVerse: 1,
    fontSize: 26,
    fontFamily: "Avenir",
    formatting: "Default",
  };

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
      headerY,
      bottomSheetRef,
      onScroll,
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
        <RecyclerListBible
          bibleScreen={bibleScreen}
          bibleSectionsRef={bibleSectionsRef}
          colors={colors}
          fontFamily={this.state.fontFamily}
          fontSize={this.state.fontSize}
          paragraphBibleRef={paragraphBibleRef}
          HEADER_HEIGHT={HEADER_HEIGHT}
          onScroll={onScroll}
          ref={paragraphBibleRef}
          topPanel={topPanel}
        />
      </>
    );
  }
}
