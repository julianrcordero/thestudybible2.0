import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import colors from "../config/colors";
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
            fontSize: this.props.titleSize,
            backgroundColor: colors.white,
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

export default class ParagraphBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = { fontSize: this.props.fontSize };

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        title={item.title}
        titleSize={this.props.titleSize}
      />
      <Paragraph
        key={i}
        chapterNum={item.chapterNum}
        crossrefSize={this.props.crossrefSize}
        // focusedVerse={focusedVerse}
        fontSize={this.state.fontSize}
        section={item}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
      />
    </React.Fragment>
  );

  render() {
    const { HEADER_HEIGHT, sections, scrollY, top } = this.props;

    return (
      <AnimatedFlatList
        bounces={false}
        data={sections}
        extra={this.state.fontSize}
        // initialNumToRender={20}
        keyExtractor={(item) => item.chapterNum.toString()}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        renderItem={this.renderParagraphItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[
          styles.bibleTextView,
          { paddingTop: HEADER_HEIGHT, paddingBottom: HEADER_HEIGHT + 300 },
        ]}
      />
    );
  }
}

const styles = {
  bibleTextView: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },
};
