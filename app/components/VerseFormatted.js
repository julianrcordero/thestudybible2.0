import React, { PureComponent } from "react";
import { Text } from "react-native";

import reactStringReplace from "react-string-replace";

// const myReplace = () => {
//   reactStringReplace(verse["__text"], /(\n)/g, (match, i) => (
//     <Text key={i}>{match}</Text>
//   ));
// };

class VerseFormatted extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { verse } = this.props;

    const matchFunction = (match, i) =>
      Array.isArray(verse["crossref"])
        ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
        : verse["crossref"]["_let"];

    const matchFunction2 = (match, i) => match;

    return verse["crossref"]
      ? reactStringReplace(verse["__text"], /(\n)/g, matchFunction)
      : reactStringReplace(verse["__text"], /(\n)/g, matchFunction2);
  }
}

export default VerseFormatted;
