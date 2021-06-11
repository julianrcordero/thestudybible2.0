import React, { PureComponent, Component } from "react";
import { FlatList, Text, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { TouchableHighlight } from "react-native";
import { Paragraph } from "react-native-paper";
import { List } from "immutable";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  sectionStyle = {
    backgroundColor: "red",
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

export default class Chapter extends PureComponent {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => item.chapterNum.concat(index);

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.chapterHeading !== nextProps.chapterHeading) {
  //     return true;
  //   } else if (this.props.chapterNum !== nextProps.chapterNum) {
  //     return true;
  //   } else if (this.props.colors !== nextProps.colors) {
  //     return true;
  //   } else if (this.props.verses !== nextProps.verses) {
  //     return true;
  //   } else if (this.props.titleSize !== nextProps.titleSize) {
  //     return true;
  //   } else if (this.props.fontSize !== nextProps.fontSize) {
  //     // console.log("fontSize changed");
  //     return true;
  //   }
  //   return false;
  // }

  mapVerse = ({ item, index, separators }) => (
    <Verse
      chapterNum={this.props.chapterNum}
      key={this.keyExtractor}
      onPress={() => this.props.openStudyScreen(this.props.chapterNum, i + 1)}
      verseNumber={index + 1}
      verseText={item["#text"]}
      verseTextStyle={this.props.verseTextStyle}
      // searchWords={searchWords}
    />
  );

  mapVerseObject = (verse, i) => (
    <Verse
      chapterNum={this.props.chapterNum}
      key={i}
      onPress={() => this.props.openStudyScreen(this.props.chapterNum, i + 1)}
      verseNumber={i + 1}
      verseText={List(verse["#text"])}
      verseTextStyle={this.props.verseTextStyle}
      // searchWords={searchWords}
    />
  );

  onLayout = ({ nativeEvent: { layout } }) => {
    this.props._heights[this.props.index] = layout.height;
    // console.log("onLayout");
  };

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      fontSize,
      // onHideUnderlay,
      // onShowUnderlay,
      style,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Array.isArray(chapterHeading) ? chapterHeading[0] : chapterHeading);

    return (
      // style={style}
      // onLayout={this.onLayout}
      <>
        <SectionHeader colors={colors} title={title} titleSize={titleSize} />
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.map(this.mapVerseObject)}
        </Paragraph>
      </>
      // <FlatList
      //   // contentContainerStyle={{ flexDirection: "column" }}
      //   horizontal
      //   data={verses}
      //   // numColumns={3}
      //   renderItem={this.mapVerse}
      //   style={{ width: "100%" }}
      // />
    );
  }
}
