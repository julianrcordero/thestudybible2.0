import React, { PureComponent } from "react";

import userMarkup from "../api/userMarkup";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import AppText from "./Text";

export default class Highlight extends PureComponent {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    highlight: this.props.highlight
      ? { backgroundColor: this.props.highlight.class_name }
      : null,
  };

  toggleHighlight = () => {
    this.setState({
      highlight: this.state.highlight ? null : { backgroundColor: "lightblue" },
    });
  };

  //   toggleHighlight = async () => {
  //     if (this.state.highlight) {
  //       let theHighlight = this.state.highlight;
  //       this.setState({ highlight: null });
  //       const newCache = this.props.currentHighlights.filter(
  //         (f) => f.start_ref != this.props.referenceFilter
  //       );

  //       this.props.setCurrentHighlights(newCache);

  //       if (theHighlight.id > 0) {
  //         const result = await userMarkup.deleteUserMarkup(
  //           theHighlight.id,
  //           this.props.user.sub,
  //           "highlight"
  //         );

  //         if (!result.ok) {
  //           console.log(result);
  //         } else {
  //           console.log(
  //             "deleted highlight with id:",
  //             theHighlight.id,
  //             "on ",
  //             theHighlight.start_ref
  //           );
  //         }
  //       }
  //     } else {
  //       let dummyHighlight = {
  //         end_ref: this.props.referenceFilter,
  //         start_ref: this.props.referenceFilter,
  //       };

  //       this.setState({ highlight: dummyHighlight });

  //       const result = await userMarkup.addUserMarkup(
  //         dummyHighlight,
  //         this.props.user.sub,
  //         "highlight"
  //       );

  //       let newHighlight = {
  //         id: result ? result.data : 0,
  //         ...dummyHighlight,
  //       };

  //       this.setState({
  //         highlight: newHighlight,
  //       });

  //       this.props.setCurrentHighlights([
  //         ...this.props.currentHighlights,
  //         newHighlight,
  //       ]);

  //       if (!result.ok) {
  //         return alert("Could not create the note.");
  //       } else {
  //         console.log(
  //           "created highlight with id:",
  //           result.data,
  //           "on ",
  //           newHighlight.start_ref
  //         );
  //       }
  //     }
  //   };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.highlight !== this.props.highlight &&
  //     this.props.highlight !== this.state.highlight
  //   ) {
  //     console.log("componentDidUpdate");
  //     this.setState({ highlight: this.props.highlight });
  //   }
  // }

  render() {
    const {
      colorPaletteVisible,
      highlight,
      text,
      verseBoxStyle,
      verseTextStyle,
    } = this.props;

    const highlightStyle = highlight
      ? { backgroundColor: highlight.class_name }
      : {};

    return (
      // <View style={{ flexDirection: "column" }}>
      //   <View
      //     style={{
      //       backgroundColor: "black",
      //       height: colorPaletteVisible ? 50 : 0,
      //       width: 100,
      //     }}
      //   ></View>
      <TouchableOpacity onPress={this.toggleHighlight} style={verseBoxStyle}>
        <AppText style={verseTextStyle}>
          <Text style={this.state.highlight}>{text}</Text>
        </AppText>
      </TouchableOpacity>
      // </View>
    );
  }
}
