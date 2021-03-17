import React, { PureComponent } from "react";

import VerseFormatted from "./VerseFormatted";
import { Text } from "react-native";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    loved: false,
  };

  render() {
    const { content, style } = this.props;

    return (
      <Text style={style}>
        <VerseFormatted verse={content} crossrefSize={12} />
      </Text>
    );
  }
}
