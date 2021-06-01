import React, { Component, PureComponent } from "react";
import { Text, SectionList } from "react-native";
import Animated from "react-native-reanimated";

import defaultStyles from "../config/styles";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { chapter, title } = this.props;
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
        {chapter + "\t" + title}
      </Text>
    );
  }
}

class VerseText extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { verseText } = this.props;
    return <Text>{verseText}</Text>;
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
    if (prevState.sections !== this.state.sections) {
      console.log(this.state.sections.length, "sections");
    } else if (prevState.index !== this.state.index) {
      console.log(prevState.index, "-->", this.state.index);
      this.scrollToChapter();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      // console.log("fontFamily");
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      // console.log("fontSize");
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      // console.log("colors");
      return true;
    } else if (this.state.sections !== nextState.sections) {
      // console.log("sections");
      return true;
    } else if (this.state.index !== nextState.index) {
      // console.log("index");
      return true;
    }
    return false;
  }

  renderItem = ({ index, section }) => (
    // <Text>{section.data[index]["__text"]}</Text>
    <VerseText verseText={section.data[index]["__text"]} />
    // <Chapter
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

  renderSectionHeader = ({ section: { chapter, title } }) => (
    <AnimatedSectionHeader
      chapter={chapter}
      colors={this.props.colors}
      title={title}
      titleSize={this.props.fontSize * 1.75}
    />
  );

  getItemLayout = (data, index) => ({
    length: this.props.fontSize * 3,
    offset: this.props.fontSize * index,
    index,
  });

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
        // bounces={false}
        // getItemLayout={this.getItemLayout}
        initialNumToRender={1}
        keyExtractor={this.keyExtractor}
        // maxToRenderPerBatch={3}
        numColumns={2}
        onContentSizeChange={() =>
          bibleSectionsRef.current.getNode().scrollToLocation({
            sectionIndex: this.state.index,
            itemIndex: 0,
          })
        }
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        onScrollToIndexFailed={() => {
          const wait = new Promise((resolve) => setTimeout(resolve, 200));
          wait.then(() => {
            console.log("trying again");
            // bibleSectionsRef.current.getNode().scrollToEnd();
            // this.scrollToChapter();
          });
        }}
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
