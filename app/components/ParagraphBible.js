import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeProvider";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // const { colors, isDark } = useTheme();
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

export default class ParagraphBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  // state = { fontFamily: this.props.fontFamily };

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        colors={this.props.colors}
        title={item.title}
        titleSize={this.props.fontSize * 1.5}
      />
      <Paragraph
        colors={this.props.colors}
        formatting={this.props.formatting}
        key={i}
        chapterNum={item.chapterNum}
        // crossrefSize={this.props.crossrefSize}
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
    // const { colors, isDark } = useTheme();
    const {
      colors,
      darkMode,
      HEADER_HEIGHT,
      sections,
      scrollY,
      top,
    } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingHorizontal: 25,
      },
    };

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
            // backgroundColor: darkMode ? colors.primary : colors.white,
            paddingTop: HEADER_HEIGHT,
            paddingBottom: HEADER_HEIGHT + 300,
          },
        ]}
      />
    );
  }
}
