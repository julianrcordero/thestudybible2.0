import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeProvider";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";
import AppText from "./Text";

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

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        colors={this.props.colors}
        title={item.title}
        titleSize={this.props.fontSize * 1.5}
      />
      {/* <AppText>{item.chapterNum}</AppText> */}
      <Paragraph
        chapterNum={item.chapterNum}
        colors={this.props.colors}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        formatting={this.props.formatting}
        key={i}
        section={item}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
      />
    </React.Fragment>
  );

  render() {
    const { colors, HEADER_HEIGHT, sections, scrollY } = this.props;

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
            paddingTop: HEADER_HEIGHT,
            paddingBottom: HEADER_HEIGHT + 300,
          },
        ]}
      />
    );
  }
}
