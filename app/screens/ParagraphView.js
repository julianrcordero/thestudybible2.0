import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../config/styles";
import Highlighter from "react-native-highlight-words";
// import { TouchableOpacity } from "react-native-gesture-handler";

import VerseBox from "../components/VerseBox";
export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { chapterNum, section, searchWords, onPress } = this.props;

    return (
      <Text>
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            verse={data}
            onPress={onPress}
            searchWords={searchWords}
          />
        ))}
      </Text>
    );
  }
}

class Verse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
    };
  }

  _toggleHighlight = () => {
    if (this.state.backgroundColor === "white") {
      this.setState({ backgroundColor: "yellow" });
    } else {
      this.setState({ backgroundColor: "white" });
    }
  };

  render() {
    const { chapterNum, verse, searchWords, onPress } = this.props;

    const parsedReference = `${chapterNum} : ${verse["_num"]}`;

    const parsedVerse = verse["crossref"]
      ? verse["__text"].replace(
          /\n/g,
          Array.isArray(verse["crossref"])
            ? verse["crossref"][0]["_let"]
            : verse["crossref"]["_let"]
        )
      : verse["__text"].replace(/\n/g, "");

    const reactStringReplace = require("react-string-replace");
    // const parsedVerse = verse["crossref"]
    //   ? reactStringReplace(verse["__text"], /\n/g, (match, i) => (
    //       <Text
    //         key={i}
    //         style={{ flexDirection: "row", alignItems: "flex-start" }}
    //       >
    //         <Text style={{ fontSize: 13, lineHeight: 10 }}>
    //           {Array.isArray(verse["crossref"])
    //             ? verse["crossref"][0]["_let"]
    //             : verse["crossref"]["_let"]}
    //         </Text>
    //         {match}
    //       </Text>
    //     ))
    //   : reactStringReplace(verse["__text"], /\n/g, (match, i) => (
    //       <Text key={i}>{match}</Text>
    //     ));

    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            backgroundColor: this.state.backgroundColor,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          },
        ]}
        onPress={onPress}
        onLongPress={this._toggleHighlight}
      >
        <Text style={{ fontWeight: "bold" }}> {verse["_num"]} </Text>
        {parsedVerse}
        {/* <HighlightComponent
          highlightStyle={{ backgroundColor: "red" }}
          searchWords={searchWords}
          textToHighlight={parsedVerse}
        /> */}
      </Text>
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
