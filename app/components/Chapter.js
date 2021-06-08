import React, { Component, PureComponent } from "react";
import { Text, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { TouchableHighlight } from "react-native";
// import { Paragraph, Text } from "react-native-paper";

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

export default class Chapter extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = () => {
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.verse !== this.props.verse) {
  //   }
  // };

  keyExtractor = (item, index) => index.toString();

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chapterHeading !== nextProps.chapterHeading) {
      return true;
    } else if (this.props.chapterNum !== nextProps.chapterNum) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.verses !== nextProps.verses) {
      return true;
    } else if (this.props.titleSize !== nextProps.titleSize) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      // console.log("fontSize changed");
      return true;
    }
    return false;
  }

  mapVerse = (verse, i) => i + 1 + " " + verse;

  mapVerseObject = (verse, i) => (
    <Verse
      chapterNum={this.props.chapterNum}
      key={i}
      _openStudyScreen={this._openStudyScreen}
      verseNumber={i + 1}
      verseText={verse}
      verseTextStyle={this.props.verseTextStyle}
      // searchWords={searchWords}
    />
  );

  _openStudyScreen = (verseNumber) => {
    this.props.bibleScreen.current?.toggleSlideView(
      this.props.chapterNum,
      verseNumber
    );
  };

  onLayout = ({ nativeEvent: { layout } }) => {
    // this.props.paragraphBibleRef.current?.addToLayoutsMap(
    //   layout.height,
    //   Number(this.props.chapterNum) - 1
    // );
    this.props._heights[this.props.chapterNum - 1] = layout.height;
  };

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      fontSize,
      // onHideUnderlay,
      // onShowUnderlay,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Array.isArray(chapterHeading) ? chapterHeading[0] : chapterHeading);

    return (
      <
        // TouchableHighlight
        // onShowUnderlay={onShowUnderlay}
        // onHideUnderlay={onHideUnderlay}
      >
        <SectionHeader colors={colors} title={title} titleSize={titleSize} />
        <Text style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.map(this.mapVerse)}
        </Text>
      </
        // TouchableHighlight
      >
    );
  }
}
