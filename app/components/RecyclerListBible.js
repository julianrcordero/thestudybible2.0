import React, { Component } from "react";
import { Dimensions, Text } from "react-native";
import Animated from "react-native-reanimated";
import {
  ContextProvider,
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";
import bookPaths from "../json/Bible";

import { List } from "immutable";
import Constants from "expo-constants";
import { InteractionManager } from "react-native";
import { View } from "react-native";
const { height, width } = Dimensions.get("window");

const AnimatedRecyclerListView = Animated.createAnimatedComponent(
  RecyclerListView
);

export default class RecyclerListBible extends Component {
  constructor(props) {
    super(props);

    this._layoutProvider = new LayoutProvider(
      (index) => {
        return 0;
      },
      (type, dim) => {
        dim.width = 1;
        dim.height = 1300;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    this.state = {
      // bookTitle: "Psalms",
      startChapter: 0,
      endChapter: 4,
      loading: true,
      fakeVerses: [
        "The quick brown fox jumps over the lazy dog.",
        "The quick brown fox jumps over the lazy dog.",
        "The quick brown fox jumps over the lazy dog.",
        "The quick brown fox jumps over the lazy dog.",
        "The quick brown fox jumps over the lazy dog.",
      ],
      // contextProvider: new ContextHelper("PARENT"),
      dataProvider: this.provideData.cloneWithRows([
        {
          chapterNum: 1,
          chapterHeading: "chapter heading",
          verses: [
            {
              verseNum: 1,
              verseText: "verse text",
            },
          ],
        },
      ]),
      // sections: [],
      timesUpdated: 0,
    };
  }

  provideData = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  paragraphBible = this.props.bibleSectionsRef;

  height = height - Constants.statusBarHeight;
  _heights = [];

  componentDidMount() {
    this.setState({
      bookTitle: this.props.bibleScreen.current?.state.currentBook ?? "Psalms",
      startChapter: 1,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.startChapter !== this.state.startChapter &&
      this.state.startChapter > 0
    ) {
      console.log("startChapter is", this.state.startChapter);
      // if (
      //   this.state.startChapter >= prevState.startChapter &&
      //   this.state.startChapter <= this.state.endChapter &&
      //   this.state.startChapter !== 1
      // ) {
      //   console.log(
      //     "already loaded",
      //     this.state.startChapter,
      //     "just scrolling"
      //   );
      //   this.scrollByIndex(
      //     this.state.startChapter - prevState.startChapter + 1
      //   );
      // } else {
      let newBook = bookPaths[
        this.props.bibleScreen.current?.state.currentBook
      ].getIn(["crossway-bible", "book", "chapter"]);

      let startIndex = this.state.startChapter - 2;
      let newSections = newBook
        .slice(startIndex > 0 ? startIndex : 0, this.state.startChapter)
        .toArray();
      // [newBook.get(this.state.startChapter - 1)]; //FOR ONE

      this.setState({
        dataProvider: this.provideData.cloneWithRows(newSections),
        endChapter: this.state.startChapter + 1,
        sections: newSections,
        timesUpdated: 0,
        totalChapters: newBook.size, //.length,
      });
      // }

      setTimeout(this.loadNextVerses, 0);
    } else if (prevState.timesUpdated !== this.state.timesUpdated) {
      if (this.state.timesUpdated === 2) {
        if (this.state.startChapter !== 1) {
          const interactionPromise = InteractionManager.runAfterInteractions(
            () => setTimeout(() => this.scrollByIndex(1), 0)
          );
          () => interactionPromise.cancel();
        }
        // this.loadPreviousVerses();
        // this.loadNextVerses();
      }
    } else if (prevState.dataProvider !== this.state.dataProvider) {
      // console.log("dataProvider changed");
    } else if (prevState.sections !== this.state.sections) {
      console.log("sections changed");
    } else if (prevState.bookTitle !== this.state.bookTitle) {
    } else if (prevState.totalChapters !== this.state.totalChapters) {
    } else if (prevState.timesUpdated !== this.state.timesUpdated) {
    } else {
      console.log("something else happened");
    }
    // if (prevState.endChapter !== this.state.endChapter) {
    //   if (this.state.startChapter + 1 === this.state.endChapter) {
    //     //initial load
    //     // this.loadPreviousVerses();
    //     console.log("initial load");
    //     this.loadNextVerses();
    //   }
    //   // console.log("endChapter changed");

    //   // this.setState({ refreshing: false });
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.bookTitle !== nextState.bookTitle) {
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.startChapter !== nextState.startChapter) {
      return true;
    } else if (this.state.endChapter !== nextState.endChapter) {
      return true;
    } else if (this.state.totalChapters !== nextState.totalChapters) {
      return true;
    } else if (this.state.dataProvider !== nextState.dataProvider) {
      return true;
    } else if (this.state.timesUpdated !== nextState.timesUpdated) {
      return true;
    }
    return false;
  }

  keyExtractor = (item) => item.chapterNum;

  getOffsetByIndex = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      const elementHeight = this._heights[i];
      if (elementHeight) {
        offset += this._heights[i];
      }
    }
    return offset + 5;
  };

  scrollByIndex = (index) => {
    // setTimeout(() =>
    this.props.bibleSectionsRef.current?._scrollViewRef.scrollTo({
      x: 0,
      y: this.getOffsetByIndex(index),
      animated: false,
    });
    // );
  };

  onVisibleIndicesChanged = (TOnItemStatusChanged) => {
    console.log(TOnItemStatusChanged);
    let firstVisibleIndex = TOnItemStatusChanged[0];
    // if (firstVisibleIndex === 1) {
    //   console.log("LOAD PREVIOUS VERSES");
    //   // this.loadPreviousVerses();
    // }

    let currentChapter = firstVisibleIndex + this.state.startChapter - 1;
    // console.log(this.state.endChapter, currentChapter);
    if (this.state.endChapter - currentChapter == 3) {
      this.loadNextVerses();
    }

    this.props.bibleScreen.current.setState({
      currentChapter: currentChapter > 0 ? currentChapter : 1,
    });
  };

  onRecreate = (OnRecreateParams) => {
    console.log(OnRecreateParams);
  };

  chapterStyle = {
    paddingHorizontal: width * 0.075,
  };

  openStudyScreen = (chapter, verse) => {
    this.props.bibleScreen.current?.toggleSlideView(chapter, verse);
  };

  //Given type and data return the view component
  _rowRenderer(type, item, index, extendedState) {
    return (
      <Chapter
        chapterHeading={item.get("heading")}
        chapterNum={item.get("@num") ?? String(index + 1)}
        colors={this.props.colors}
        fontSize={this.props.fontSize}
        openStudyScreen={this.openStudyScreen}
        index={index}
        paragraphBibleRef={this.props.paragraphBibleRef}
        style={this.chapterStyle}
        titleSize={this.props.fontSize * 1.75}
        verses={item.get("verse")}
        verseTextStyle={[
          defaultStyles.bibleText,
          {
            color: this.props.colors.text,
            fontSize: this.props.fontSize,
            lineHeight: this.props.fontSize * 2,
            fontFamily: this.props.fontFamily,
          },
        ]}
      />
    );
  }

  //   addToLayoutsMap(height, index) {
  //     this._heights[index] = height;
  //   }

  // applyWindowCorrection = (offset, windowCorrection) => {
  //   console.log(offset, windowCorrection);
  // };

  // onItemLayout = (number) => {
  //   console.log("onItemLayout", number);
  // };

  loadPreviousVerses = () => {
    // console.log(this.state.startChapter, this.state.totalChapters);
    if (this.state.startChapter > 1) {
      let endIndex = this.state.startChapter - 2;

      let newBeginning = endIndex - 3;

      const newMessages = bookPaths[this.state.bookTitle]
        .getIn(["crossway-bible", "book", "chapter"])
        .slice(newBeginning >= 0 ? newBeginning : 0, endIndex)
        .toArray();

      if (newMessages.length > 0) {
        console.log("adding newMessages", newMessages.length);
        this.setState((state) => ({
          dataProvider: this.state.dataProvider.cloneWithRows(
            newMessages.concat(state.sections)
          ),
          sections: newMessages.concat(state.sections),
        }));
      }
    }
  };

  loadNextVerses = () => {
    // console.log("loadNextVerses");
    // console.log(this.state.endChapter, this.state.totalChapters);
    if (this.state.endChapter <= this.state.totalChapters) {
      const newMessages = bookPaths[this.state.bookTitle]
        .getIn(["crossway-bible", "book", "chapter"])
        .slice(this.state.endChapter - 1, this.state.endChapter - 1 + 3)
        .toArray();

      if (newMessages.length > 0) {
        this.setState((state) => ({
          dataProvider: this.state.dataProvider.cloneWithRows(
            this.state.sections.concat(newMessages)
          ),
          endChapter: state.endChapter + 3,
          sections: state.sections.concat(newMessages),
        }));
      }
    }
  };

  renderFooter = () => {
    return <View style={{ height: 70 }} />;
  };

  render() {
    const {
      bibleSectionsRef,
      colors,
      fontSize,
      HEADER_HEIGHT,
      onScroll,
    } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        // flex: 1,
      },
    };

    return (
      <AnimatedRecyclerListView
        // applyWindowCorrection={this.applyWindowCorrection}
        bounces={false}
        canChangeSize={true}
        // contextProvider={this.state.contextProvider}
        // extendedState={fontSize}
        layoutProvider={this._layoutProvider}
        // onItemLayout={(e) => {
        // this.scrollByIndex(1);
        // if (e >= this.state.dataProvider.getSize() - 1) {
        //   // this.setState({loadingMessages: false}); // HERE
        //   console.log("onItemLayout");
        // }
        // }}
        dataProvider={this.state.dataProvider}
        // initialRenderIndex={this.state.sections.length > 1 ? 1 : 0}
        // onRecreate={this.onRecreate}
        onVisibleIndicesChanged={this.onVisibleIndicesChanged}
        rowRenderer={this._rowRenderer}
        forceNonDeterministicRendering={true}
        onItemLayout={this.onItemLayout}
        onScroll={onScroll}
        renderFooter={this.renderFooter}
        scrollThrottle={16}
        scrollViewProps={{
          ref: bibleSectionsRef,
          // showsVerticalScrollIndicator: false,
        }}
        style={styles.bibleTextView}
      />
    );
  }
}
