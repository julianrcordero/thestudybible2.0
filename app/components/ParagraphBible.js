import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";
import bookPaths from "../json/Bible";

import Constants from "expo-constants";
import { ImmutableVirtualizedList } from "react-native-immutable-list-view";
import { List } from "immutable";
const { height, width } = Dimensions.get("window");

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
    startIndex: 0,
    endIndex: 3,
    refreshing: false,
    sections: bookPaths["Psalms"]["crossway-bible"].book.chapter.slice(0, 3),
    totalChapters: bookPaths["Psalms"]["crossway-bible"].book.chapter.length,
  };

  screenHeight = height - Constants.statusBarHeight;

  componentDidMount() {
    // console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startIndex !== this.state.startIndex) {
      this.componentDidMount();
      let endIndex = this.state.startIndex + 3;

      console.log("setting book to", this.state.bookTitle);
      this.setState({
        endIndex: endIndex,
        refreshing: true,
        sections: bookPaths[this.state.bookTitle][
          "crossway-bible"
        ].book.chapter.slice(this.state.startIndex, endIndex),
        totalChapters:
          bookPaths[this.state.bookTitle]["crossway-bible"].book.chapter.length,
      });
    } else if (prevState.bookTitle !== this.state.bookTitle) {
    } else if (prevState.sections !== this.state.sections) {
      this.setState({ refreshing: false });
    } else {
      // console.log("something else happened");
    }
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
    } else if (this.state.startIndex !== nextState.startIndex) {
      return true;
    } else if (this.state.endIndex !== nextState.endIndex) {
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
    if (viewableItems[0]) {
      const v = viewableItems[0];

      if (this.state.endIndex - Number(v.item["@num"]) == 2) {
        console.log("I am 2 away from the end");
        this.loadNextVerses();
      }

      this.props.bibleScreen.current.setState({
        currentChapter: v.item["@num"], //.chapter,
      });
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: false,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    viewAreaCoveragePercentThreshold: 50,
    // itemVisiblePercentThreshold: 25,
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
      verses={item.verse}
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
    return new Promise((resolve) => {
      // Lets resolve after 500 ms, to simulate network latency.
      setTimeout(() => {
        resolve(
          bookPaths[this.state.bookTitle]["crossway-bible"].book.chapter.slice(
            this.state.endIndex,
            this.state.endIndex + numChapters
          )
        );
      }, 0);
    });
  };

  loadPreviousVerses = async () => {
    const newMessages = await this.queryMoreChapters(3);
    // this.setState({
    //   sections: newMessages.concat(this.state.sections),
    // });

    console.log("loaded previous verses!");
    // setMessages((m) => {
    //   return m.concat(newMessages);
    // });
  };

  // Add 10 more messages to beginning of the list.
  // In real chat application, this is where you have your pagination logic.
  loadNextVerses = async () => {
    console.log(this.state.startIndex, this.state.endIndex);
    if (this.state.endIndex < this.state.totalChapters) {
      const newMessages = await this.queryMoreChapters(3);

      if (newMessages.length > 0)
        this.setState({
          endIndex: this.state.endIndex + 3,
          sections: this.state.sections.concat(newMessages),
          // .slice(newMessages.length),
        });
    }

    console.log("loaded next verses!");
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
        // decelerationRate={"fast"}
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
        maintainVisibleContentPosition
        // maxToRenderPerBatch={10}
        // onEndReached={this.loadNextVerses}
        // onEndReachedThreshold={height * 3}
        // onStartReached={this.loadPreviousVerses}
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
        updateCellsBatchingPeriod={25}
        viewabilityConfig={this.viewConfigRef}
        windowSize={7}
      />
    );
  }
}
