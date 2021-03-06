import React, { PureComponent } from "react";
import { Text } from "react-native";
// import Highlighter from "react-native-highlight-words";
// import VerseFormatted from "./VerseFormatted";
// import { Text } from "react-native-paper";
// import HTML from "react-native-render-html";
import { List } from "immutable";

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.verseNumber !== nextProps.verseNumber) {
  //     return true;
  //   } else if (this.props.verseText !== nextProps.verseText) {
  //     return true;
  //   } else if (this.state.backgroundColor !== nextState.backgroundColor) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    const { onPress, verseNumber, verseText } = this.props;

    const verseNumberStyle = {
      fontWeight: "bold",
      color: "#00aeef",
    };

    const verseStyle = {
      backgroundColor: this.state.backgroundColor,
      // textDecorationLine: this.state.textDecorationLine,
      // focusedVerse == Number(verse["_num"]) ? "underline" : "none",
    };

    return (
      // <HTML
      //   // color={colors.text}
      //   source={{
      //     html: verseText,
      //   }}
      //   renderers={{
      //     // verse: {
      //     //   renderer: (
      //     //     htmlAttribs,
      //     //     children,
      //     //     convertedCSSStyles,
      //     //     passProps
      //     //   ) => {
      //     //     return children;
      //     //   },
      //     //   wrapper: "Text",
      //     // },
      //     crossref: {
      //       renderer: (
      //         htmlAttribs,
      //         children,
      //         convertedCSSStyles,
      //         passProps
      //       ) => {
      //         children;
      //       },
      //       wrapper: "Text",
      //     },
      //   }}
      //   // tagsStyles={{
      //   //   heading: { color: "blue", fontSize: 16, lineHeight: 20 },
      //   // }}
      // />
      <Text
        onPress={this._toggleHighlight}
        onLongPress={onPress}
        style={verseStyle}
      >
        {verseNumber + " "}

        {List.isList(verseText) ? verseText.map((phrase) => phrase) : verseText}
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
