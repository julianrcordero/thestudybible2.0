import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeContext";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, isDark } = useTheme();
    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            color: this.props.darkMode ? colors.light : colors.dark,
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

export default class ParagraphBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  // state = { fontFamily: this.props.fontFamily };

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        darkMode={this.props.darkMode}
        title={item.title}
        titleSize={this.props.fontSize * 1.5}
      />
      <Paragraph
        formatting={this.props.formatting}
        key={i}
        chapterNum={item.chapterNum}
        crossrefSize={this.props.crossrefSize}
        // focusedVerse={focusedVerse}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        section={item}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
      />
    </React.Fragment>
  );

  render() {
    const { darkMode, HEADER_HEIGHT, sections, scrollY, top } = this.props;

    const { colors, isDark } = useTheme();

    return (
      <AnimatedFlatList
        bounces={false}
        data={sections}
        // extra={this.props.fontSize}
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
          {
            backgroundColor: darkMode ? colors.primary : colors.white,
            paddingTop: HEADER_HEIGHT,
            paddingBottom: HEADER_HEIGHT + 300,
          },
        ]}
      />
    );
  }
}

const styles = {
  bibleTextView: {
    backgroundColor: "red", //colors.white,
    paddingHorizontal: 25,
  },
};
