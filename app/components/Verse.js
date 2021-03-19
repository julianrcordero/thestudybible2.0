import React, { PureComponent } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Highlighter from "react-native-highlight-words";
import reactStringReplace from "react-string-replace";
import VerseFormatted from "./VerseFormatted";

export default class Verse extends PureComponent {
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

  render() {
    const {
      chapterNum,
      // crossrefSize,
      // focusedVerse,
      verse,
      searchWords,
      style,
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

    const isFirst = verse["_num"] === "1";

    return (
      // <View style={isFirst && styles.container}>
      <Text onPress={onPress} onLongPress={this._toggleHighlight}>
        {/* {isFirst ? (
            <Text style={{ fontSize: 50 }}>{chapterNum}</Text>
          ) : ( */}
        <Text
          style={{
            fontWeight: "bold",
            color: "#00aeef",
          }}
        >
          {" "}
          {verse["_num"]}{" "}
        </Text>
        {/* )} */}

        <Text
          style={{
            backgroundColor: this.state.backgroundColor,
            // textDecorationLine: this.state.textDecorationLine,
            // focusedVerse == Number(verse["_num"]) ? "underline" : "none",
          }}
        >
          <VerseFormatted verse={verse} crossrefSize={12} />
        </Text>
        {/* <HighlightComponent
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={searchWords}
          textToHighlight={parsedVerse}
        /> */}
      </Text>
      // </View>
    );
  }
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
