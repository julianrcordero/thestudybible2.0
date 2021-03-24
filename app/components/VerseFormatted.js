import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";

import reactStringReplace from "react-string-replace";
import { useTheme } from "../config/ThemeProvider";

const myReplace = () => {
  reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
    <Text key={i}>{match}</Text>
  ));
};

class VerseFormatted extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, verse } = this.props;

    return (
      <Text style={style}>
        {verse["crossref"]
          ? reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
              <Text key={i}>
                {Array.isArray(verse["crossref"])
                  ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
                  : verse["crossref"]["_let"]}
                {/* {match} */}
              </Text>
            ))
          : reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
              <Text key={i}>{match}</Text>
            ))}
      </Text>
    );
  }
}

export default VerseFormatted;
