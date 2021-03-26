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
    const { verse } = this.props;

    return verse["crossref"]
      ? reactStringReplace(verse["__text"], /(\n)/g, (match, i) =>
          Array.isArray(verse["crossref"])
            ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
            : verse["crossref"]["_let"]
        )
      : reactStringReplace(verse["__text"], /(\n)/g, (match, i) => match);
  }
}

export default VerseFormatted;
