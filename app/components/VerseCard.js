import React, { PureComponent } from "react";
import { View } from "react-native";

import AppText from "../components/Text";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    loved: false,
  };

  // shouldComponentUpdate(nextProps) {
  //   const { content } = this.props;
  //   return content !== nextProps.content;
  // }

  reference = (book, chapter, title) => (
    <View
      style={{
        alignItems: "center",
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <AppText
        style={[
          this.props.style,
          {
            fontWeight: "bold",
            textAlign: "left",
          },
        ]}
      >
        {book + " " + chapter + " : " + title}
      </AppText>
    </View>
  );

  verse = (content) => (
    <AppText
      style={[
        this.props.style,
        {
          color: this.props.colors.text,
          lineHeight: this.props.fontSize * 2,
        },
      ]}
    >
      {content}
    </AppText>
  );

  render() {
    const { chapter, content, currentBook, fontSize, title } = this.props;

    return (
      <View style={{ paddingBottom: fontSize * 2 }}>
        {this.reference(currentBook.label, chapter, title)}
        {this.verse(content)}
      </View>
    );
  }
}
