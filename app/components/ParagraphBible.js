import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
// import { FlatList } from "@stream-io/flat-list-mvcp";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";
import bookPaths from "../json/Bible";
// import booksPaths from "../xml/Bible";
import parser from "fast-xml-parser";

import Constants from "expo-constants";
import { ImmutableVirtualizedList } from "react-native-immutable-list-view";
import { List } from "immutable";
const { height, width } = Dimensions.get("window");

// var he = require("he");
// var options = {
//   attributeNamePrefix: "",
//   attrNodeName: "attr", //default is 'false'
//   textNodeName: "text",
//   ignoreAttributes: true,
//   ignoreNameSpace: true,
//   allowBooleanAttributes: false,
//   parseNodeValue: true,
//   parseAttributeValue: true,
//   trimValues: true,
//   cdataTagName: "__cdata", //default is 'false'
//   cdataPositionChar: "\\c",
//   parseTrueNumberOnly: false,
//   arrayMode: false,
//   attrValueProcessor: (val, attrName) =>
//     he.decode(val, { isAttributeValue: true }), //default is a=>a
//   tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
//   format: true,
//   supressEmptyNode: true,
//   stopNodes: ["heading", "verse"], //"crossref", "q", "note"],
// };

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedImmutableVirtualizedList = Animated.createAnimatedComponent(
  ImmutableVirtualizedList
);

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bookTitle: "Psalms",
    startChapter: 0,
    endChapter: 4,
    refreshing: false,
    // totalChapters: bookPaths["Psalms"].getIn([
    //   "crossway-bible",
    //   "book",
    //   "chapter"
    // ]).size,
  };

  screenHeight = height - Constants.statusBarHeight;

  componentDidMount() {
    //XML ONLY
    // let myBook = booksPaths["Ecclesiastes"];
    // //optional (it'll return an object in case it's not valid)
    // var jsonObj = parser.parse(myBook, options);
    // let sections = jsonObj["crossway-bible"].book.chapter;
    // console.log(sections);
    // this.setState({
    //   sections: sections.slice(0, 3),
    //   totalChapters: sections.length,
    // });

    // let sections = bookPaths["Psalms"]
    //   .getIn(["crossway-bible", "book", "chapter"])
    //   .slice(0, 3);
    // console.log(sections.size);

    // let theBook = bookPaths["Psalms"]["crossway-bible"].book.chapter;
    this.setState({
      startChapter: 1,
      // sections: theBook.slice(0, 3),
      // totalChapters: theBook.length,
    });
    this.props.bibleScreen.current?.setState({
      currentBook: this.state.bookTitle,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startChapter !== this.state.startChapter) {
      let endChapter = this.state.startChapter + 3;

      let newBook =
        bookPaths[this.state.bookTitle]["crossway-bible"].book.chapter;

      let newSections = newBook[this.state.startChapter - 1];
      // newBook[this.state.startChapter - 1];
      // let newSections = newBook.slice(
      //   this.state.startChapter - 1,
      //   endChapter - 1
      // ); //3

      console.log("loading new sections");
      this.setState({
        endChapter: this.state.startChapter + 1,
        refreshing: true,
        sections: [newSections],
        totalChapters: newBook.length,
      });
    } else if (prevState.endChapter !== this.state.endChapter) {
      if (this.state.startChapter + 1 === this.state.endChapter) {
        this.loadNextVerses();
      }
      this.setState({ refreshing: false });
    } else if (prevState.bookTitle !== this.state.bookTitle) {
    } else if (prevState.totalChapters !== this.state.totalChapters) {
    } else if (prevState.sections !== this.state.sections) {
    } else {
      console.log("something else happened");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.bookTitle !== nextState.bookTitle) {
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.state.startChapter !== nextState.startChapter) {
      return true;
    } else if (this.state.endChapter !== nextState.endChapter) {
      return true;
    } else if (this.state.totalChapters !== nextState.totalChapters) {
      return true;
    }
    return false;
  }

  onScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: false }
  );

  scrollByIndex = (index) => {
    this.props.bibleSectionsRef.current?.scrollToIndex({
      animated: false,
      index: index, //this.state.index,
    });
  };

  onViewRef = ({ viewableItems, changed }) => {
    // console.log("changed", changed[0].item["@num"]);
    const v = viewableItems[0];
    if (v) {
      // console.log(v);
      if (this.state.endChapter - Number(v.item["@num"]) == 2) {
        this.loadNextVerses();
      }

      this.props.bibleScreen.current.setState({
        currentChapter: v.item["@num"], //.chapter,
      });
    }
  };
  viewConfigRef = {
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 50,
  };

  keyExtractor = (item, index) => String(index);

  openStudyScreen = (chapter, verse) => {
    this.props.bibleScreen.current?.toggleSlideView(chapter, verse);
  };

  renderItem = ({ item, index, separators }) => (
    <Chapter
      chapterHeading={item.heading}
      chapterNum={item["@num"] ?? index + 1}
      colors={this.props.colors}
      fontSize={this.props.fontSize}
      key={this.keyExtractor}
      // _heights={this._heights}
      // searchWords={searchWords}
      // onPress={this.props.toggleSlideView}
      // onShowUnderlay={separators.highlight}
      // onHideUnderlay={separators.unhighlight}
      openStudyScreen={this.openStudyScreen}
      // style={{ height: this.screenHeight }}
      titleSize={this.props.fontSize * 1.75}
      verses={List(item.verse)}
      verseTextStyle={[
        defaultStyles.bibleText,
        {
          color: this.props.colors.text,
          fontSize: this.props.fontSize,
          lineHeight: this.props.fontSize * 2,
          fontFamily: this.props.fontFamily,
          // height: this.screenHeight,
        },
      ]}
    />
  );

  queryMoreChapters = (numChapters) => {
    return bookPaths[this.state.bookTitle]["crossway-bible"].book.chapter.slice(
      this.state.endChapter - 1,
      this.state.endChapter - 1 + numChapters
    );
  };

  loadPreviousVerses = () => {
    if (this.state.startChapter > 1) {
      let startIndex = this.state.startChapter - 1;

      const newMessages = bookPaths[this.state.bookTitle][
        "crossway-bible"
      ].book.chapter.slice(startIndex - 3, startIndex);

      if (newMessages.length > 0) {
        // let newSections = newMessages.concat(this.state.sections);

        this.setState({
          sections: [...newMessages, ...this.state.sections],
        });
      }
    }
  };

  loadNextVerses = () => {
    console.log(this.state.endChapter, this.state.totalChapters);
    if (this.state.endChapter <= this.state.totalChapters) {
      const newMessages = bookPaths[this.state.bookTitle][
        "crossway-bible"
      ].book.chapter.slice(
        this.state.endChapter - 1,
        this.state.endChapter - 1 + 3
      );

      if (newMessages.length > 0) {
        this.setState({
          endChapter: this.state.endChapter + 3,
          sections: [...this.state.sections, ...newMessages],
          // .slice(newMessages.length),
        });
      }
    }
  };

  // queryMoreChapters = (numChapters) => {
  //   return new Promise((resolve) => {
  //     // Lets resolve after 500 ms, to simulate network latency.
  //     setTimeout(() => {
  //       resolve(
  //         bookPaths[this.state.bookTitle]["crossway-bible"].book.chapter.slice(
  //           this.state.endChapter,
  //           this.state.endChapter + numChapters
  //         )
  //       );
  //     }, 0);
  //   });
  // };

  // loadPreviousVerses = async () => {
  //   const newMessages = await this.queryMoreChapters(3);
  //   // this.setState({
  //   //   sections: newMessages.concat(this.state.sections),
  //   // });

  //   console.log("loaded previous verses!");
  // };

  // loadNextVerses = async () => {
  //   console.log(this.state.startChapter, this.state.endChapter);
  //   if (this.state.endChapter < this.state.totalChapters) {
  //     const newMessages = await this.queryMoreChapters(3);

  //     if (newMessages.length > 0) {
  //       let newSections = this.state.sections.concat(newMessages);

  //       console.log("new sections.length", newSections.length);
  //       this.setState({
  //         endChapter: this.state.endChapter + 3,
  //         sections: newSections,
  //         // .slice(newMessages.length),
  //       });
  //     }
  //   }

  //   console.log("loaded next verses!");
  // };

  onStartReached = async () => {
    const newMessages = await this.queryMoreChapters(3);
    // this.setState({
    //   sections: newMessages.concat(this.state.sections),
    // });

    console.log("loaded previous verses!");
  };

  render() {
    const { bibleSectionsRef, colors, HEADER_HEIGHT } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        flex: 1,
      },
    };

    return (
      // <AnimatedImmutableVirtualizedList
      //   bounces={false}
      //   // getItemLayout={this.getItemLayout}
      //   immutableData={this.state.sections}
      //   // initialNumToRender={150}
      //   keyExtractor={this.keyExtractor}
      //   maxToRenderPerBatch={10}
      //   onViewableItemsChanged={this.onViewRef}
      //   removeClippedSubviews
      //   renderItem={this.renderItem}
      //   renderEmptyInList={() => <Text>{"No data"}</Text>}
      //   ref={bibleSectionsRef}
      //   onScroll={this.onScroll}
      //   onScrollToIndexFailed={this.scrollToIndexFailed}
      //   scrollEventThrottle={16}
      //   style={[styles.bibleTextView, defaultStyles.paddingText]}
      //   ListFooterComponent={<View />}
      //   ListFooterComponentStyle={{ height: 70 }}
      //   updateCellsBatchingPeriod={25}
      //   viewabilityConfig={this.viewConfigRef}
      //   windowSize={7}
      // />
      <AnimatedFlatList
        bounces={false}
        data={this.state.sections}
        disableIntervalMomentum
        // getItemLayout={this.getItemLayout}
        // initialNumToRender={10}
        // initialScrollIndex={1}
        // ItemSeparatorComponent={this.ItemSeparatorComponent}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: "green",
              flex: 1,
              height: "100%",
              width: "100%",
            }}
          ></View>
        }
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 70 }}
        maintainVisibleContentPosition={{
          // autoscrollToTopThreshold: 10,
          minIndexForVisible: 0,
        }}
        // maintainPositionAtOrBeyondIndex={0}
        maxToRenderPerBatch={2}
        // onContentSizeChange={() => console.log("onContentSizeChange")}
        // onEndReached={this.loadNextVerses}
        // onEndReachedThreshold={height * 3}
        // onStartReached={this.loadPreviousVerses}
        // onStartReachedThreshold={}
        onViewableItemsChanged={this.onViewRef}
        onScroll={this.onScroll}
        ref={bibleSectionsRef}
        refreshing={this.state.refreshing}
        removeClippedSubviews
        renderItem={this.renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        // snapToAlignment={"center"}
        // snapToInterval={this.height}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        updateCellsBatchingPeriod={10}
        viewabilityConfig={this.viewConfigRef}
        windowSize={5}
      />
    );
  }
}
