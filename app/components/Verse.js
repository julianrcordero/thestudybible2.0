import React, { Component, PureComponent } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
import reactStringReplace from "react-string-replace";
import VerseFormatted from "./VerseFormatted";
import defaultStyles from "../config/styles";

export default class Verse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "transparent",
      // textDecorationLine: "none",
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor != "#FFFB79") {
      this.setState({ backgroundColor: "#FFFB79" });
    } else {
      this.setState({ backgroundColor: "transparent" });
    }
  };

  // _toggleUnderline = () => {
  //   if (this.state.textDecorationLine === "none") {
  //     this.setState({ textDecorationLine: "underline" });
  //   } else {
  //     this.setState({ textDecorationLine: "none" });
  //   }
  // };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.verseNumber !== nextProps.verseNumber) {
      return true;
    } else if (this.props.verseText !== nextProps.verseText) {
      return true;
    } else if (this.state.backgroundColor !== nextState.backgroundColor) {
      return true;
    }
    return false;
  }

  render() {
    const {
      // focusedVerse,
      verseNumber,
      verseText,
      // searchWords,
      onPress,
    } = this.props;

    styles = {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        flexDirection: "row",
      },
    };

    const isFirst = verseNumber === "1";

    // const textStyle = [defaultStyles.bibleText, style];

    const verseNumberStyle = {
      fontWeight: "bold",
      color: "#00aeef",
    };

    const verseTextStyle = {
      backgroundColor: this.state.backgroundColor,
      // textDecorationLine: this.state.textDecorationLine,
      // focusedVerse == Number(verse["_num"]) ? "underline" : "none",
    };

    return (
      <Text
        onPress={this._toggleHighlight}
        onLongPress={onPress}
        style={verseTextStyle}
      >
        <Text style={verseNumberStyle}>{verseNumber}</Text>

        {/* <Text style={verseTextStyle}> */}

        {verseText}
        {/* <VerseFormatted verse={verse} /> */}
        {/* </Text> */}
      </Text>
    );
  }
}

{
  /* <HighlightComponent
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={searchWords}
          textToHighlight={parsedVerse}
        /> */
}
class HighlightComponent extends PureComponent {
  render() {
    const { style, highlightStyle, searchWords, textToHighlight } = this.props;

    return (
      <Highlighter
        style={style}
        highlightStyle={highlightStyle}
        searchWords={searchWords}
        textToHighlight={textToHighlight}
      />
    );
  }
}
