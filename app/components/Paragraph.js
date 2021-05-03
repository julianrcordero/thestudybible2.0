import React, { Component, PureComponent } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";

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
    if (this.props.section !== nextProps.section) {
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
      section,
      searchWords,
      onPress,
    } = this.props;

    return (
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
        {section.map((data, j) => (
          <Verse
            key={j}
            // chapterNum={chapterNum}
            verse={data}
            onPress={() => onPress(chapterNum, j + 1)}
            // searchWords={searchWords}
          />
        ))}
      </Text>
    );
  }
}
