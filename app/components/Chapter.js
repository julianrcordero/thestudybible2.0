import React, { Component, PureComponent } from "react";
import { Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";
import Animated from "react-native-reanimated";
import { Paragraph } from "react-native-paper";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  sectionStyle = {
    color: this.props.colors.primary,
    fontSize: this.props.titleSize,
  };

  render() {
    return (
      <Text style={[defaultStyles.bibleText, this.sectionStyle]}>
        {this.props.title}
      </Text>
    );
  }
}

const AnimatedSectionHeader = Animated.createAnimatedComponent(SectionHeader);

export default class Chapter extends Component {
  constructor(props) {
    super(props);
  }

  ConditionalWrapper = ({ wrapper, children }) =>
    this.props.formatting == "Default" ? wrapper(children) : children;

  keyExtractor = (item, index) => item + index;

  renderVerseItem = ({ item, i }) => (
    <Verse
      key={i}
      verse={item}
      // onPress={() => onPress(chapterNum, j + 1)}
      // searchWords={searchWords}
    />
  );

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chapterNum !== nextProps.chapterNum) {
      return true;
    } else if (this.props.chapterHeading !== nextProps.chapterHeading) {
      return true;
    } else if (this.props.verses !== nextProps.verses) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.titleSize !== nextProps.titleSize) {
      return true;
    } else if (this.props.verseTextStyle !== nextProps.verseTextStyle) {
      return true;
    }
    return false;
  }

  mapVerse = (verse, i) => verse.verseNum + " " + verse.verseText;
  // (
  //   <Verse
  //     chapterNum={chapterNum}
  //     bibleScreen={bibleScreen}
  //     key={i}
  //     verseNumber={verse.verseNum}
  //     verseText={verse.verseText}
  //     // searchWords={searchWords}
  //   />
  // )

  mapVerseObject = (verse, j) => (
    <Verse
      chapterNum={this.props.chapterNum}
      bibleScreen={this.props.bibleScreen}
      key={j}
      verseNumber={verse.verseNum}
      verseText={verse.verseText}
      // searchWords={searchWords}
    />
  );

  onLayout = ({ nativeEvent: { layout } }) => {
    this.props.paragraphBibleRef.current?.addToLayoutsMap(
      layout,
      Number(this.props.chapterNum) - 1
    );
  };

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      paragraphBibleRef,
      searchWords,
      // onPress,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Array.isArray(chapterHeading) ? chapterHeading[0] : chapterHeading);

    return (
      <View onLayout={this.onLayout}>
        <AnimatedSectionHeader
          colors={colors}
          title={title}
          titleSize={titleSize}
        />
        <Paragraph style={verseTextStyle}>
          {verses.map(this.mapVerseObject)}
        </Paragraph>
      </View>
      //   <AnimatedSectionHeader
      //     colors={colors}
      //     title={title}
      //     titleSize={titleSize}
      //   />
      // </>
      // <View>
      //   <AnimatedSectionHeader
      //     colors={colors}
      //     title={title}
      //     titleSize={titleSize}
      //   />
      //   <Text style={verseTextStyle}>{verses.map(this.mapVerseObject)}</Text>
    );
  }
}
