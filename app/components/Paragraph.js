import React, { Component, PureComponent } from "react";
import { Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";
import Animated from "react-native-reanimated";

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

export default class Paragraph extends Component {
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

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      searchWords,
      onPress,
      paragraphStyle,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Array.isArray(chapterHeading) ? chapterHeading[0] : chapterHeading);

    return (
      <View
      // onLayout={(event) => {
      //   const { height } = event.nativeEvent.layout;
      //   console.log(height);
      // }}
      // style={paragraphStyle}
      >
        <AnimatedSectionHeader
          colors={colors}
          title={title}
          titleSize={titleSize}
        />

        <Text style={[defaultStyles.bibleText, verseTextStyle, paragraphStyle]}>
          {verses.map(
            (verse, j) => verse.verseText

            // (
            //   <Verse
            //     key={j}
            //     // chapterNum={chapterNum}
            //     verseNumber={verse.verseNumber}
            //     verseText={verse.verseText}
            //     onPress={() => onPress(chapterNum, j + 1)}
            //     // searchWords={searchWords}
            //     // style={style}
            //   />
            // )
          )}
        </Text>
      </View>
    );
  }
}
