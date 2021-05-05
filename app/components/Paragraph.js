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
      height,
      item,
      searchWords,
      onPress,
    } = this.props;

    return (
      <View style={{ height: height }}>
        <AnimatedSectionHeader
          colors={this.props.colors}
          title={
            item["_num"] +
            "\t" +
            (Array.isArray(item["heading"])
              ? item["heading"][0]
              : item["heading"])
          }
          titleSize={this.props.fontSize * 1.75}
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
      </View>
    );
  }
}
