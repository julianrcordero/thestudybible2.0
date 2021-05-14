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
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";

import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedRecyclerListView =
  Animated.createAnimatedComponent(RecyclerListView);

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);

    this._layoutProvider = new LayoutProvider(
      (index) => {
        return 0;
      },
      (type, dim) => {
        dim.width = width * 0.075;
        dim.height = 140;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    this.state = {
      dataProvider: this.dataProvider.cloneWithRows([
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
      index: 0,
    };
  }

  //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
  //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
  dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  paragraphBible = this.props.bibleSectionsRef;

  height = height - Constants.statusBarHeight;

  state = {
    loading: false,
    sections: [],
  };

  componentDidMount() {
    console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate");
    if (prevState.index !== this.state.index) {
      this.scrollToChapter();
    } else if (prevState.sections !== this.state.sections) {
      this.setState({
        dataProvider: this.dataProvider.cloneWithRows(this.state.sections),
      });
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

  scrollByIndex = () => {
    // this.setState({ loading: true });
    setTimeout(() =>
      this.paragraphBible.current?.scrollToIndex({
        animated: false,
        index: this.state.index, //this.state.index,
      })
    );
    // this.setState({ loading: false });
  };

  scrollToChapter = () => {
    //important to have this interaction manager
    const interactionPromise = InteractionManager.runAfterInteractions(
      // this.scrollByIndex //FLATLIST
      this.scrollToComment
    );

    () => interactionPromise.cancel();
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

  //Given type and data return the view component
  _rowRenderer(type, item) {
    return (
      <Chapter
        bibleScreen={this.props.bibleScreen}
        chapterHeading={item.chapterHeading}
        chapterNum={Number(item.chapterNum)}
        colors={this.props.colors}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        formatting={this.props.formatting}
        // key={i}
        // searchWords={searchWords}
        // onPress={this.props.toggleSlideView}
        paragraphBibleRef={this.props.paragraphBibleRef}
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
  }

  // Gets the total height of the elements that come before
  // element with passed index
  getOffsetByIndex = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      const elementLayout = this._layouts[i];
      if (elementLayout && elementLayout.height) {
        offset += this._layouts[i].height;
      }
    }
    return offset;
  };

  // Gets the comment object and if it is a comment
  // is in the list, then scrolls to it
  scrollToComment = () => {
    console.log(this.state.index);
    const offset = this.getOffsetByIndex(this.state.index);
    console.log(offset);
    setTimeout(() =>
      this.props.bibleSectionsRef.current?._scrollViewRef.scrollTo({
        x: 0,
        y: offset,
        animated: false,
      })
    );
  };

  // Fill the list of objects with element sizes
  addToLayoutsMap(layout, index) {
    this._layouts[index] = layout;
  }

  _layouts = [];

  render() {
    const { bibleSectionsRef, colors, HEADER_HEIGHT, scrollY } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        flex: 1,
        // paddingHorizontal: width * 0.075,
        // paddingBottom: HEADER_HEIGHT + 500,
      },
    };

    return (
      <AnimatedRecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        initialRenderIndex={this.state.index}
        rowRenderer={this._rowRenderer}
        forceNonDeterministicRendering={true}
        onScroll={this.scroll}
        scrollThrottle={16}
        scrollViewProps={{
          ref: bibleSectionsRef,
        }}
        style={styles.bibleTextView}
      />
      // <AnimatedFlatList
      //   bounces={false}
      //   data={this.state.sections}
      //   decelerationRate={"normal"}
      //   extraData={this.state.index}
      //   // getItemLayout={this.getItemLayout}
      //   initialNumToRender={50}
      //   initialScrollIndex={this.state.index}
      //   keyExtractor={this.keyExtractor}
      //   ListEmptyComponent={
      //     <View
      //       style={{ backgroundColor: "green", height: height, width: width }}
      //     ></View>
      //   }
      //   // maxToRenderPerBatch={3}
      //   onViewableItemsChanged={this.onViewRef}
      //   onScroll={this.scroll}
      //   onScrollToIndexFailed={this.scrollToIndexFailed}
      //   ref={bibleSectionsRef}
      //   // removeClippedSubviews
      //   renderItem={this.renderItem}
      //   scrollEventThrottle={16}
      //   showsVerticalScrollIndicator={false}
      //   // snapToAlignment={"center"}
      //   // snapToInterval={this.height}
      //   style={[styles.bibleTextView, defaultStyles.paddingText]}
      //   updateCellsBatchingPeriod={10}
      //   viewabilityConfig={this.viewConfigRef}
      //   // windowSize={101}
      // />
    );
  }
}
