import React, { Component } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";

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

    this.state = {
      index: 0,
      sections: List([]),
    };
  }

  screenHeight = height - Constants.statusBarHeight - 70;

  componentDidMount() {
    console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      console.log("scrolling to", this.state.index);
      this.scrollByIndex(this.state.index);
    } else if (prevState.sections !== this.state.sections) {
      console.log(this.state.sections.size, "chapters loaded");
      // let scrollToThis = Math.floor(this.state.sections.length / 2);
      // console.log("scrolling to", this.state.index);
      // this.scrollByIndex(1);
      // this.scrollByIndex(this.state.index);
    }
    // else {
    //   console.log("prevProps", prevProps);
    // }
  }

  getItemLayout = (data, index) => ({
    length: this.screenHeight,
    offset: this.screenHeight * index,
    index,
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.index !== nextState.index) {
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
    { useNativeDriver: true }
  );

  scrollByIndex = (index) => {
    this.props.bibleSectionsRef.current?.scrollToIndex({
      animated: false,
      index: index, //this.state.index,
    });
  };

  scrollToIndexFailed = (info) => {
    console.log("scrollToIndexFailed");

    // const wait = new Promise((resolve) => setTimeout(resolve, 500));
    // wait.then(() => {
    //   this.scrollByIndex(info.index);
    // });
  };

  onViewRef = ({ viewableItems, changed }) => {
    // console.log("viewable items", viewableItems);
    if (viewableItems[0]) {
      const v = viewableItems[0];
      // console.log("addThis", v.index - this.state.index);
      // this.setState({ addThis: v.index - this.state.index });
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

  renderItem = ({ item, index, separators }) => (
    <Chapter
      bibleScreen={this.props.bibleScreen}
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
      style={{ height: this.screenHeight }}
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

  onEndReached = ({ distanceFromEnd }) =>
    console.log("loading another chapter");

  _heights = [];

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
        getItemLayout={this.getItemLayout}
        immutableData={this.state.sections}
        // initialNumToRender={150}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        renderEmptyInList={() => <Text>{"No data"}</Text>}
        ref={bibleSectionsRef}
        onScroll={this.onScroll}
        onScrollToIndexFailed={this.scrollToIndexFailed}
        scrollEventThrottle={16}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 70 }}
      />
      // <AnimatedFlatList
      //   bounces={false}
      //   data={this.state.sections}
      //   // decelerationRate={"fast"}
      //   // getItemLayout={this.getItemLayout}
      //   initialNumToRender={10}
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
      //   maxToRenderPerBatch={10}
      //   onEndReached={this.onEndReached}
      //   onEndReachedThreshold={3}
      //   onViewableItemsChanged={this.onViewRef}
      //   onScroll={this.scroll}
      //   onScrollToIndexFailed={this.scrollToIndexFailed}
      //   ref={bibleSectionsRef}
      //   removeClippedSubviews
      //   renderItem={this.renderItem}
      //   scrollEventThrottle={16}
      //   showsVerticalScrollIndicator={false}
      //   // snapToAlignment={"center"}
      //   // snapToInterval={this.height}
      //   style={[styles.bibleTextView, defaultStyles.paddingText]}
      //   updateCellsBatchingPeriod={25}
      //   viewabilityConfig={this.viewConfigRef}
      //   windowSize={7}
      // />
    );
  }
}
