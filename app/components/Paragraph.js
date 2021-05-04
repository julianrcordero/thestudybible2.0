import React, { Component, PureComponent } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";
import Animated from "react-native-reanimated";

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
          },
        ]}
      >
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
    if (this.props.item !== nextProps.item) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.props.formatting !== nextProps.formatting) {
      return true;
    }
    return false;
  }

  render() {
    const {
      chapterNum,
      colors,
      fontFamily,
      fontSize,
      height,
      item,
      section,
      searchWords,
      onPress,
    } = this.props;

    return (
      // <View
      //   // onLayout={(event) => {
      //   //   const { height } = event.nativeEvent.layout;
      //   //   console.log(height);
      //   // }}
      //   style={{ height: height }}
      // >
      <>
        <AnimatedSectionHeader
          colors={colors}
          title={
            item["_num"] +
            "\t" +
            (Array.isArray(item["heading"])
              ? item["heading"][0]
              : item["heading"])
          }
          titleSize={fontSize * 1.75}
        />
        <Text
          style={[
            defaultStyles.bibleText,
            {
              color: colors.text,
              fontSize: fontSize,
              lineHeight: fontSize * 2,
              fontFamily: fontFamily,
            },
          ]}
        >
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. */}
          {item["verse"].map((data, j) => (
            <Verse
              key={j}
              // chapterNum={chapterNum}
              verse={data}
              onPress={() => onPress(chapterNum, j + 1)}
              // searchWords={searchWords}
            />
          ))}
        </Text>
      </>
    );
  }
}
