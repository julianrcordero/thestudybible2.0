import React, { Component, PureComponent } from "react";
import { FlatList, Text } from "react-native";
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
            // borderBottomColor: "#345171",
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

export default class ParagraphBible extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sections: [],
  };

  componentDidUpdate() {
    console.log("ParagraphBible.js updated");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      console.log("fontFamily changed (ParagraphBible.js)");
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      console.log("fontFamily changed (ParagraphBible.js)");
      return true;
    } else if (this.state.sections !== nextState.sections) {
      //(this.state.sections.length !== nextState.sections.length) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    }
    return false;
  }

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        colors={this.props.colors}
        title={
          Array.isArray(item["heading"]) ? item["heading"][0] : item["heading"]
        }
        titleSize={this.props.fontSize * 1.5}
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

  render() {
    const { colors, HEADER_HEIGHT, scrollY } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingHorizontal: 30,
      },
    };

    return (
      <AnimatedFlatList
        bounces={false}
        data={this.state.sections}
        initialNumToRender={1}
        keyExtractor={this.keyExtractor}
        maxToRenderPerBatch={3}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        removeClippedSubviews
        renderItem={this.renderParagraphItem}
        // scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[
          styles.bibleTextView,
          {
            paddingTop: HEADER_HEIGHT,
            paddingBottom: HEADER_HEIGHT + 300,
          },
        ]}
        updateCellsBatchingPeriod={150}
        windowSize={3}
      />
    );
  }
}
