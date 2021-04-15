import React, { Component, PureComponent } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";

export default class Paragraph extends PureComponent {
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

  componentDidUpdate(prevProps, prevState) {
    // console.log("paragraph", this.props.fontSize);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.section !== nextProps.section) {
  //     console.log("section changed");
  //     return true;
  //   }
  //   return false;
  // }

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
      // <this.ConditionalWrapper
      //   wrapper={(children) => (
      //     <Text
      //       style={[
      //         defaultStyles.bibleText,
      //         {
      //           color: colors.text,
      //           fontSize: this.state.fontSize,
      //           lineHeight: this.state.fontSize * 2,
      //           fontFamily: fontFamily,
      //         },
      //       ]}
      //     >
      //       {children}
      //     </Text>
      //   )}
      // >
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
