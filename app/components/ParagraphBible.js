import React, { Component, PureComponent } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            color: this.props.colors.primary,
            fontSize: this.props.titleSize,
          },
        ]}
      >
        {this.props.title}
      </Text>
    );
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedSectionHeader = Animated.createAnimatedComponent(SectionHeader);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    sections: [],
  };

  componentDidMount() {
    console.log("paragraphBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.sections.length !== this.state.sections.length) {
    //   console.log(this.state.sections.length, "elements in paragraph Bible");
    // }
    if (prevState.index !== this.state.index) {
      this.scrollToChapter();
    }
  }

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

  renderItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        colors={this.props.colors}
        title={
          item["_num"] +
          "\t" +
          (Array.isArray(item["heading"])
            ? item["heading"][0]
            : item["heading"])
        }
        titleSize={this.props.fontSize * 1.75}
      />
      <Paragraph
        chapterNum={Number(item["_num"])}
        colors={this.props.colors}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        formatting={this.props.formatting}
        key={i}
        section={item["verse"]}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
      />
    </React.Fragment>
  );

  keyExtractor = (item) => item["_num"];

  contentSizeChange = () => {
    console.log("contentSizeChange DOE nyama nyama");

    const flatList = this.props.bibleSectionsRef.current;
    if (flatList) {
      flatList.scrollToIndex({ animated: false, index: this.state.index });
    }
  };

  scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  scrollToChapter = () => {
    console.log("scrollToChapter");

    const flatList = this.props.bibleSectionsRef.current;
    if (flatList) {
      console.log("scrolling to", this.state.index);
      flatList.scrollToIndex({
        animated: false,
        index: this.state.index,
      });
    }
  };

  scrollToIndexFailed = (error) => {
    // console.log("scrollToIndexFailed");
    const offset = error.averageItemLength * error.index;

    const flatList = this.props.bibleSectionsRef.current;

    if (flatList) {
      console.log("attempting to scroll to offset");
      flatList.scrollToOffset({ animated: false, offset: offset });
      setTimeout(() => {
        console.log("attempting to scroll to index");
        flatList.scrollToIndex({ animated: false, index: error.index });
      }, 100); // You may choose to skip this line if the above typically works well because your average item height is accurate.
    }
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
        // getItemLayout={this.getItemLayout}
        initialNumToRender={20}
        // initialScrollIndex={this.state.index}
        keyExtractor={this.keyExtractor}
        maxToRenderPerBatch={20}
        // numColumns={2}
        // onEndReached={() => console.log("onEndReached")}
        // onEndReachedThreshold={0.75}
        // onContentSizeChange={this.contentSizeChange}
        onScroll={this.scroll}
        onScrollToIndexFailed={this.scrollToIndexFailed}
        ref={bibleSectionsRef}
        // removeClippedSubviews
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        updateCellsBatchingPeriod={25}
        windowSize={31}
      />
    );
  }
}
