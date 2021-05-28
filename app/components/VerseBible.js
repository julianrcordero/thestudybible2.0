import React, { Component } from "react";
import { Dimensions, FlatList, InteractionManager, View } from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";

import Constants from "expo-constants";
import Verse from "./Verse";
const { height, width } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class VerseBible extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      sections: [],
      verses: [],
      // layoutsRendered: true,
    };
  }

  paragraphBible = this.props.bibleSectionsRef;

  height = height - Constants.statusBarHeight;

  state = {
    loading: false,
  };

  componentDidMount() {
    console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate");
    //need to set layoutsRendered to true when list has loaded
    // if (
    //   prevState.layoutsRendered !== this.state.layoutsRendered &&
    //   this.state.layoutsRendered
    // )
    if (prevState.index !== this.state.index) {
      //   console.log("scrolling to", this.state.index);
      this.scrollByIndex(this.state.index);
    }
  }

  getItemLayout = (data, index) => ({
    length: this.height,
    offset: this.height * index,
    index,
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.state.verses !== nextState.verses) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.index !== nextState.index) {
      return true;
    }
    return false;
  }

  keyExtractor = (item, index) => index.toString();

  scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  scrollByIndex = (index) => {
    // this.props.bibleSectionsRef.current?.scrollToIndex({
    //   animated: false,
    //   index: index, //this.state.index,
    // });
    console.log("requested chapter", index + 1);

    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      let myIndex = this.state.verses.findIndex(
        (obj) => obj.chapter === index + 1 && obj.title === 1
      );
      console.log(myIndex);

      // this.props.verseList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        this.props.bibleSectionsRef.current?.scrollToIndex({
          animated: false,
          index: myIndex,
        });
      });
    });
    () => interactionPromise.cancel();
  };

  scrollToIndexFailed = (info) => {
    console.log(info);
    // this.scrollToChapter();

    const offset = info.averageItemLength * info.index;
    console.log("scrollToIndexFailed", offset);
    this.props.bibleSectionsRef.current?.scrollToOffset({
      animated: false,
      offset: offset,
    });

    // scrollToIndex({
    //   animated: false,
    //   index: info.highestMeasuredFrameIndex,
    // });

    setTimeout(() => {
      this.props.bibleSectionsRef.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    });
  };

  onViewRef = (viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];
      this.props.bibleScreen.current.setState({
        currentChapter: v.item.chapterNum,
      });
      // sendVerseToToolBar(v.item.chapter, v.item.title);
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: false,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    viewAreaCoveragePercentThreshold: 75,
    // itemVisiblePercentThreshold: 75,
  };

  renderItem = ({ item, i }) => (
    <Verse
      chapterNum={item.chapter}
      bibleScreen={item.bibleScreen}
      key={i}
      paragraphBibleRef={this.props.paragraphBibleRef}
      verseNumber={item.verse}
      verseText={item.text}
      verseTextStyle={[
        defaultStyles.bibleText,
        {
          color: this.props.colors.text,
          fontSize: this.props.fontSize,
          lineHeight: this.props.fontSize * 2,
          fontFamily: this.props.fontFamily,
          // height: this.height,
        },
      ]}
      // searchWords={searchWords}
    />
  );

  // Gets the total height of the elements that come before
  // element with passed index
  getOffsetByIndex = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      const elementLayout = this._heights[i];
      if (elementLayout && elementLayout.height) {
        offset += this._heights[i].height;
      }
    }
    return offset;
  };

  addToLayoutsMap(layout, index) {
    this._heights[index] = layout;
    // this.setState({ _heights: [...this._heights, layout] });
  }

  _heights = [];

  render() {
    const { bibleSectionsRef, colors, HEADER_HEIGHT } = this.props;

    const styles = {
      bibleTextView: {
        // alignItems: "center",
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        flex: 1,
        // paddingHorizontal: width * 0.075,
        // paddingBottom: HEADER_HEIGHT + 500,
      },
    };

    return (
      <AnimatedFlatList
        bounces={false}
        data={this.state.verses}
        decelerationRate={"normal"}
        extraData={this.state.index}
        // getItemLayout={this.getItemLayout}
        // initialNumToRender={50}
        initialScrollIndex={this.state.index}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={
          <View
            style={{ backgroundColor: "green", height: height, width: width }}
          ></View>
        }
        // maxToRenderPerBatch={3}
        onViewableItemsChanged={this.onViewRef}
        onScroll={this.scroll}
        onScrollToIndexFailed={this.scrollToIndexFailed}
        ref={bibleSectionsRef}
        // removeClippedSubviews
        renderItem={this.renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        // snapToAlignment={"center"}
        // snapToInterval={this.height}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        // updateCellsBatchingPeriod={10}
        viewabilityConfig={this.viewConfigRef}
        windowSize={11}
      />
    );
  }
}
