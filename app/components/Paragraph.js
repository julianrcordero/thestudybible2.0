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
    if (this.props.itemNum !== nextProps.itemNum) {
      return true;
    } else if (this.props.itemHeading !== nextProps.itemHeading) {
      return true;
    } else if (this.props.itemVerse !== nextProps.itemVerse) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.titleSize !== nextProps.titleSize) {
      return true;
    } else if (this.props.verseTextStyle !== nextProps.verseTextStyle) {
      return true;
    }
    //   else if (this.props.fontFamily !== nextProps.fontFamily) {
    //   return true;
    // } else if (this.props.fontSize !== nextProps.fontSize) {
    //   return true;
    // } else if (this.props.formatting !== nextProps.formatting) {
    //   return true;
    // }
    return false;
  }

  render() {
    const {
      chapterNum,
      colors,
      // item,
      itemNum,
      itemHeading,
      itemVerse,
      searchWords,
      onPress,
      paragraphStyle,
      titleSize,
      verseTextStyle,
    } = this.props;

    const title =
      itemNum +
      "\t" +
      (Array.isArray(itemHeading) ? itemHeading[0] : itemHeading);

    return (
      // <View
      //   // onLayout={(event) => {
      //   //   const { height } = event.nativeEvent.layout;
      //   //   console.log(height);
      //   // }}
      //   style={paragraphStyle}
      // >
      //   <AnimatedSectionHeader
      //     colors={colors}
      //     title={title}
      //     titleSize={titleSize}
      //   />

      <Text style={[defaultStyles.bibleText, verseTextStyle, paragraphStyle]}>
        {itemVerse.map((verse, j) => (
          <Verse
            key={j}
            // chapterNum={chapterNum}
            verseNumber={verse["_num"]}
            verseText={verse["__text"]}
            onPress={() => onPress(chapterNum, j + 1)}
            // searchWords={searchWords}
            // style={style}
          />
        ))}
      </Text>
      // </View>
    );
  }
}
