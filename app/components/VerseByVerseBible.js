import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
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
            fontSize: this.props.titleSize,
            // backgroundColor: colors.white,
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

export default class VerseByVerseBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  //   renderParagraphItem = ({ item, i }) => (
  //     <React.Fragment key={i}>
  //       <AnimatedSectionHeader
  //         title={item.title}
  //         titleSize={this.props.fontSize * 1.5}
  //       />
  //       <Paragraph
  //         key={i}
  //         chapterNum={item.chapterNum}
  //         crossrefSize={this.props.crossrefSize}
  //         // focusedVerse={focusedVerse}
  //         fontSize={this.props.fontSize}
  //         section={item}
  //         // searchWords={searchWords}
  //         onPress={this.props.toggleSlideView}
  //       />
  //     </React.Fragment>
  //   );
  styles = {
    bibleTextView: {
      // backgroundColor: colors.white,
      paddingHorizontal: 25,
    },
  };

  render() {
    const {
      fontSize,
      HEADER_HEIGHT,
      paragraphBibleRef,
      sections,
      scrollY,
      toggleSlideView,
      top,
    } = this.props;

    return (
      <AnimatedSectionList
        bounces={false}
        initialNumToRender={1}
        keyExtractor={(item, index) => item + index}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        renderItem={({ item, index, section }) => (
          <Text style={[defaultStyles.bibleText]}>
            <Verse
              key={index}
              chapterNum={section.chapterNum}
              // crossrefSize={crossrefSize}
              verse={item}
              //   searchWords={searchWords}
              onPress={() => toggleSlideView(section.chapterNum, index + 1)}
              style={[
                defaultStyles.bibleText,
                { fontSize: fontSize, lineHeight: fontSize * 2 },
              ]}
              // landscape={landscape}
            />
          </Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <AnimatedSectionHeader title={title} titleSize={fontSize * 2} />
        )}
        scrollEventThrottle={16}
        sections={sections}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        style={[styles.bibleTextView, { paddingTop: HEADER_HEIGHT }]}
      />
    );
  }
}
