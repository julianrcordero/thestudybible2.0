import React, { Component } from "react";
import { Text } from "react-native";
import Highlighter from "react-native-highlight-words";
import VerseFormatted from "./VerseFormatted";
// import { Text } from "react-native-paper";

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

  _openStudyScreen = () => {
    this.props.bibleScreen.current?.toggleSlideView(
      this.props.chapterNum,
      Number(this.props.verseNumber)
    );
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
      // searchWords,
      verseNumber,
      verseText,
    } = this.props;

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
        onLongPress={this._openStudyScreen}
        style={verseTextStyle}
      >
        {/* <Text style={verseNumberStyle}>{verseNumber + " "}</Text> */}

        {verseText}
        {/* <VerseFormatted verse={verse} /> */}
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
// class HighlightComponent extends PureComponent {
//   render() {
//     const { style, highlightStyle, searchWords, textToHighlight } = this.props;

//     return (
//       <Highlighter
//         style={style}
//         highlightStyle={highlightStyle}
//         searchWords={searchWords}
//         textToHighlight={textToHighlight}
//       />
//     );
//   }
// }
