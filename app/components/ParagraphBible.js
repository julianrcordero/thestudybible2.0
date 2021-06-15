import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
// import { FlatList } from "@stream-io/flat-list-mvcp";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";
import bookPaths from "../json/Bible";
// import booksPaths from "../xml/Bible";
// import parser from "fast-xml-parser";

import Constants from "expo-constants";
import { ImmutableVirtualizedList } from "react-native-immutable-list-view";
import { List } from "immutable";
const { height } = Dimensions.get("window");

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
    scrolledYet: false,
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

    this.setState({
      startChapter: 1,
    });
    this.props.bibleScreen.current?.setState({
      currentBook: this.state.bookTitle,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startChapter !== this.state.startChapter) {
      let endChapter = this.state.startChapter + 3;

      let newBook = bookPaths[this.state.bookTitle].getIn([
        "crossway-bible",
        "book",
        "chapter",
      ]); //["crossway-bible"].book.chapter;
      // console.log(newBook);

      let newSections = newBook.get(this.state.startChapter - 1); //[this.state.startChapter - 1];
      // console.log(newSections);

      this.setState({
        endChapter: this.state.startChapter + 1,
        // refreshing: true,
        scrolledYet: false,
        sections: List([newSections]),
        totalChapters: newBook.size, //.length,
      });
    } else if (prevState.endChapter !== this.state.endChapter) {
      if (this.state.startChapter + 1 === this.state.endChapter) {
        //initial load
        // this.loadPreviousVerses();
        this.loadNextVerses();
      }
      // this.setState({ refreshing: false });
    } else if (prevState.sections !== this.state.sections) {
      console.log("sections updated to", this.state.sections.size);
    } else if (prevState.bookTitle !== this.state.bookTitle) {
    } else if (prevState.totalChapters !== this.state.totalChapters) {
    } else {
      console.log("something else happened");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.state.bookTitle !== nextState.bookTitle) {
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
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
      if (this.state.endChapter - Number(v.item.get("@num")) == 2) {
        this.loadNextVerses();
      }

      this.props.bibleScreen.current.setState({
        currentChapter: v.item.get("@num"), //.chapter,
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
      chapterHeading={item.get("heading")}
      chapterNum={item.get("@num") ?? String(index + 1)}
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
      verses={item.get("verse")}
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

  loadPreviousVerses = () => {
    // console.log(this.state.startChapter, this.state.totalChapters);
    if (this.state.startChapter > 1) {
      let endIndex = this.state.startChapter - 1;

      let newBeginning = endIndex - 3;

      const newMessages = bookPaths[this.state.bookTitle][
        "crossway-bible"
      ].book.chapter.slice(newBeginning >= 0 ? newBeginning : 0, endIndex);

      if (newMessages.length > 0) {
        this.setState((state) => ({
          sections: [...newMessages, ...this.state.sections],
        }));
      }
    }
  };

  loadNextVerses = () => {
    // console.log(this.state.endChapter, this.state.totalChapters);
    if (this.state.endChapter <= this.state.totalChapters) {
      const newMessages = bookPaths[this.state.bookTitle]
        .getIn(["crossway-bible", "book", "chapter"])
        .slice(this.state.endChapter - 1, this.state.endChapter - 1 + 3);
      // [
      //   "crossway-bible"
      // ].book.chapter.

      if (newMessages.size > 0) {
        console.log("adding newMessages", newMessages.size);
        this.setState((state) => ({
          endChapter: state.endChapter + 3,
          sections: state.sections.concat(newMessages), //[...state.sections, ...newMessages],
          // .slice(newMessages.length),
        }));
      }
    }
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
      <AnimatedImmutableVirtualizedList
        bounces={false}
        immutableData={this.state.sections}
        // initialNumToRender={150}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 70 }}
        maxToRenderPerBatch={2}
        onViewableItemsChanged={this.onViewRef}
        onScroll={this.onScroll}
        ref={bibleSectionsRef}
        removeClippedSubviews
        renderItem={this.renderItem}
        renderEmptyInList={() => <Text>{"No data"}</Text>}
        ref={bibleSectionsRef}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        updateCellsBatchingPeriod={10}
        viewabilityConfig={this.viewConfigRef}
        windowSize={5}
      />

      // <AnimatedFlatList
      //   bounces={false}
      //   data={this.state.sections}
      //   disableIntervalMomentum
      //   // getItemLayout={this.getItemLayout}
      //   // initialNumToRender={10}
      //   // initialScrollIndex={1}
      //   // ItemSeparatorComponent={this.ItemSeparatorComponent}
      //   keyExtractor={this.keyExtractor}
      //   ListEmptyComponent={
      //     <View
      //       style={{
      //         backgroundColor: "green",
      //         flex: 1,
      //         height: "100%",
      //         width: "100%",
      //       }}
      //     ></View>
      //   }
      //   ListFooterComponent={<View />}
      //   ListFooterComponentStyle={{ height: 70 }}
      //   // maintainVisibleContentPosition={{
      //   //   // autoscrollToTopThreshold: 10,
      //   //   minIndexForVisible: 0,
      //   // }}
      //   // maintainPositionAtOrBeyondIndex={0}
      //   maxToRenderPerBatch={2}
      //   // onContentSizeChange={(contentWidth, contentHeight) => {
      //   //   // console.log("setting contentHeight", contentHeight);

      //   //   if (this.state.sections.length > 1 && !this.state.scrolledYet) {
      //   //     let offset = contentHeight - this.state.contentHeight;
      //   //     console.log("scrolling to", offset);
      //   //     bibleSectionsRef.current?.scrollToOffset({
      //   //       animated: false,
      //   //       offset: offset,
      //   //     });
      //   //     this.setState({ scrolledYet: true });
      //   //   }
      //   //   this.setState({ contentHeight: contentHeight });
      //   // }}
      //   // onEndReached={this.loadNextVerses}
      //   // onEndReachedThreshold={height * 3}
      //   // onStartReached={this.loadPreviousVerses}
      //   // onStartReachedThreshold={}
      //   onViewableItemsChanged={this.onViewRef}
      //   onScroll={this.onScroll}
      //   ref={bibleSectionsRef}
      //   // refreshing={this.state.refreshing}
      //   removeClippedSubviews
      //   renderItem={this.renderItem}
      //   scrollEventThrottle={16}
      //   showsVerticalScrollIndicator={false}
      //   // snapToAlignment={"center"}
      //   // snapToInterval={this.height}
      //   style={[styles.bibleTextView, defaultStyles.paddingText]}
      //   updateCellsBatchingPeriod={10}
      //   viewabilityConfig={this.viewConfigRef}
      //   windowSize={5}
      // />
    );
  }
}
