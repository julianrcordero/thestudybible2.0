import React, { Component, PureComponent } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";

import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);
  }

  flatList = this.props.bibleSectionsRef;

  height = height - Constants.statusBarHeight;

  state = {
    index: 0,
    initialScrollIndex: 0,
    loading: false,
    sections: [],
  };

  componentDidMount() {
    console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.initialScrollIndex !== this.state.initialScrollIndex) {
    //   console.log("initialScrollIndex:", this.state.initialScrollIndex);
    // }
    // console.log("componentDidUpdate");
    if (prevState.index !== this.state.index) {
      this.scrollToChapter();
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
    } else if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.index !== nextState.index) {
      return true;
    } else if (this.state.initialScrollIndex !== nextState.initialScrollIndex) {
      return true;
    }
    return false;
  }

  paragraphStyle = { height: this.height };

  renderItem = ({ item, i }) =>
    this.state.loading ? (
      <View
        style={{ backgroundColor: "red", height: height, width: width }}
      ></View>
    ) : (
      <Paragraph
        chapterHeading={item.chapterHeading}
        chapterNum={Number(item.chapterNum)}
        colors={this.props.colors}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        formatting={this.props.formatting}
        key={i}
        // paragraphStyle={this.paragraphStyle}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
        titleSize={this.props.fontSize * 1.75}
        verses={item.verses}
        verseTextStyle={{
          color: this.props.colors.text,
          fontSize: this.props.fontSize,
          lineHeight: this.props.fontSize * 2,
          fontFamily: this.props.fontFamily,
        }}
      />
    );

  keyExtractor = (item) => item.chapterNum;

  scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  scrollByIndex = () => {
    console.log("scrollByIndex", this.state.index);

    this.setState({ loading: true });
    setTimeout(() =>
      this.flatList.current?.scrollToIndex({
        animated: false,
        index: this.state.index, //this.state.index,
      })
    );
    this.setState({ loading: false });
  };

  scrollByErrorIndex = () => {
    console.log("scrollByErrorIndex", error.index);

    this.flatList.current?.scrollToIndex({
      animated: false,
      index: error.index,
    });
  };

  scrollToChapter = () => {
    //important to have this interaction manager
    const interactionPromise = InteractionManager.runAfterInteractions(
      this.scrollByIndex
    );

    () => interactionPromise.cancel();
  };

  scrollToIndexFailed = (info) => {
    console.log("scrollToIndexFailed");
    this.scrollToChapter();

    const offset = info.averageItemLength * info.index;
    console.log("scrollToIndexFailed", offset);
    this.flatList.current?.scrollToOffset({ animated: false, offset: offset });
    // scrollToIndex({
    //   animated: false,
    //   index: info.highestMeasuredFrameIndex,
    // });

    setTimeout(() => {
      this.flatList.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    });
    // }, 200);
  };

  onViewRef = (viewableItems) => {
    console.log(viewableItems);
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];
      console.log(v);
      this.props.bibleScreen.current.setState({
        currentChapter: v.item.chapterNum,
      });
      // sendVerseToToolBar(v.item.chapter, v.item.title);
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  };

  onViewRef = (viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];

      if (this.props.bibleScreen.current)
        this.props.bibleScreen.current.setState({
          currentChapter: v.index + 1,
        });
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  };

  render() {
    const { bibleSectionsRef, colors, HEADER_HEIGHT, scrollY } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        // paddingBottom: HEADER_HEIGHT + 500,
      },
    };

    return (
      <AnimatedFlatList
        bounces={false}
        data={this.state.sections}
        decelerationRate={"normal"}
        extraData={this.state}
        // getItemLayout={this.getItemLayout}
        initialNumToRender={50}
        initialScrollIndex={this.state.initialScrollIndex}
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
        updateCellsBatchingPeriod={25}
        viewabilityConfig={this.viewConfigRef}
        // windowSize={11}
      />
    );
  }
}
