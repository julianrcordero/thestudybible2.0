import React, { Component, PureComponent } from "react";
import { FlatList, Text, SectionList } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeProvider";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";
import Verse from "./Verse";

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

const AnimatedSectionHeader = Animated.createAnimatedComponent(SectionHeader);
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class VerseByVerseBible extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    sections: [],
  };

  componentDidMount() {
    console.log("verseByVerseBible componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      console.log("scrolling to", this.state.index);
      this.scrollToChapter();
    }
    if (prevState.sections !== this.state.sections) {
      console.log(this.state.sections.length);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.fontFamily !== nextProps.fontFamily) {
  //     return true;
  //   } else if (this.props.fontSize !== nextProps.fontSize) {
  //     return true;
  //   } else if (this.state.sections !== nextState.sections) {
  //     return true;
  //   } else if (this.props.colors !== nextProps.colors) {
  //     return true;
  //   } else if (this.state.index !== nextState.index) {
  //     return true;
  //   }
  //   return false;
  // }

  renderItem = ({ item, index, section }) => (
    <Text>{section.data[index]["__text"]}</Text>
    // <Paragraph
    //   chapterNum={Number(item["_num"])}
    //   colors={this.props.colors}
    //   fontFamily={this.props.fontFamily}
    //   fontSize={this.props.fontSize}
    //   formatting={this.props.formatting}
    //   key={i}
    //   section={item["verse"]}
    //   searchWords={searchWords}
    //   onPress={this.props.toggleSlideView}
    // />
  );

  renderSectionHeader = ({ section: { title } }) => (
    <AnimatedSectionHeader
      colors={this.props.colors}
      title={title}
      titleSize={this.props.fontSize * 1.75}
    />
  );

  keyExtractor = (item) => item["_num"];

  scrollToChapter = () => {
    if (
      this.props.bibleSectionsRef.current &&
      this.props.bibleSectionsRef.current.getNode
    ) {
      const node = this.props.bibleSectionsRef.current.getNode();
      if (node) {
        node.scrollToLocation({
          sectionIndex: this.state.index,
          itemIndex: 0,
        });
      }
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
      <AnimatedSectionList
        bounces={false}
        initialNumToRender={1}
        keyExtractor={this.keyExtractor}
        // maxToRenderPerBatch={3}
        numColumns={1}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        ref={bibleSectionsRef}
        removeClippedSubviews
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        // scrollEventThrottle={16}
        sections={this.state.sections}
        showsVerticalScrollIndicator={false}
        // stickySectionHeadersEnabled={false}
        style={[styles.bibleTextView, defaultStyles.paddingText]}
        // updateCellsBatchingPeriod={150}
        // windowSize={3}
      />
    );
  }
}
