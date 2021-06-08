import React, { Component } from "react";
import { Dimensions, FlatList, View } from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";

import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      partialSections: [],
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
    // if (prevState.index !== this.state.index) {
    //   let scrollToThis = Math.floor(this.state.partialSections.length / 2);
    //   console.log("scrolling to", scrollToThis);
    //   this.scrollByIndex(scrollToThis);
    // }
    // if (prevState.partialSections !== this.state.partialSections) {
    //   let scrollToThis = Math.floor(this.state.partialSections.length / 2);
    //   this.scrollByIndex(scrollToThis);
    // }
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
    } else if (this.state.partialSections !== nextState.partialSections) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.index !== nextState.index) {
      return true;
    }
    return false;
  }

  keyExtractor = (item) => item.chapterNum;

  scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  scrollByIndex = (index) => {
    // this.setState({ loading: true });
    // setTimeout(() =>
    this.props.bibleSectionsRef.current?.scrollToIndex({
      animated: false,
      index: index, //this.state.index,
    });
    // );
    // this.setState({ loading: false });
  };

  scrollToIndexFailed = () => {
    console.log("scrollToIndexFailed");
  };

  onViewRef = ({ viewableItems, changed }) => {
    // console.log("viewable items", viewableItems);
    if (viewableItems[0]) {
      const v = viewableItems[0];
      // console.log(v);
      this.props.bibleScreen.current.setState({
        currentChapter: v.item.chapter,
      });
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: false,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 50,
    itemVisiblePercentThreshold: 25,
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index, separators }) => (
    <Chapter
      bibleScreen={this.props.bibleScreen}
      chapterHeading={item.heading}
      chapterNum={item.chapter ?? index + 1}
      colors={this.props.colors}
      fontSize={this.props.fontSize}
      key={this.keyExtractor}
      // searchWords={searchWords}
      // onPress={this.props.toggleSlideView}
      // onShowUnderlay={separators.highlight}
      // onHideUnderlay={separators.unhighlight}
      titleSize={this.props.fontSize * 1.75}
      verses={item.verses}
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
    />
  );

  onEndReached = ({ distanceFromEnd }) =>
    console.log("loading another chapter");

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
      separator: {},
    };

    return (
      <AnimatedFlatList
        bounces={false}
        data={this.state.partialSections}
        // decelerationRate={"fast"}
        extraData={this.state.index}
        // getItemLayout={this.getItemLayout}
        initialNumToRender={10}
        // initialScrollIndex={this.state.index}
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
        )}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={
          <View
            style={{ backgroundColor: "green", height: height, width: width }}
          ></View>
        }
        maxToRenderPerBatch={10}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={3}
        onViewableItemsChanged={this.onViewRef}
        onScroll={this.scroll}
        onScrollToIndexFailed={this.scrollToIndexFailed}
        ref={bibleSectionsRef}
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
