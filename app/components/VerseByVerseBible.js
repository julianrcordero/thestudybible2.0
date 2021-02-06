import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import colors from "../config/colors";
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

export default class VerseByVerseBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  //   renderParagraphItem = ({ item, i }) => (
  //     <React.Fragment key={i}>
  //       <AnimatedSectionHeader
  //         title={item.title}
  //         titleSize={this.props.titleSize}
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
              crossrefSize={crossrefSize}
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
          <AnimatedSectionHeader title={title} titleSize={titleSize} />
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

const styles = {
  bibleTextView: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },
};
