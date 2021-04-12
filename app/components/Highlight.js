import React, { PureComponent } from "react";

import userMarkup from "../api/userMarkup";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AppText from "./Text";

export default class Highlight extends PureComponent {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    highlight: null, //this.props.highlight,
    // ? { backgroundColor: this.props.highlight.class_name }
    // : null,
  };

  // toggleHighlight = () => {
  //   this.setState({
  //     highlight: this.state.highlight ? null : { backgroundColor: "lightblue" },
  //   });
  // };

  toggleHighlight = async () => {
    if (this.state.highlight) {
      let theHighlight = this.state.highlight;
      this.setState({ highlight: null });
      const newCache = this.props.currentHighlights.filter(
        (f) => f.start_ref !== this.props.referenceFilter
      );

      this.props.setCurrentHighlights(newCache);

      if (theHighlight.id > 0) {
        this.recursiveHighlightDelete(theHighlight);
      }
    } else {
      let color = "yellow";

      let dummyHighlight = {
        end_ref: this.props.referenceFilter,
        start_ref: this.props.referenceFilter,
        class_name: color,
      };

      this.setState({ highlight: dummyHighlight });

      this.recursiveHighlightAdd(dummyHighlight);
    }
  };

  recursiveHighlightAdd = async (dummyHighlight) => {
    const result = await userMarkup.addUserMarkup(
      dummyHighlight,
      this.props.username,
      "highlight"
    );

    let newHighlight = {
      id: result ? result.data : 0,
      ...dummyHighlight,
    };

    this.setState({
      highlight: newHighlight,
    });

    this.props.setCurrentHighlights([
      ...this.props.currentHighlights,
      newHighlight,
    ]);

    if (!result.ok) {
      console.log(
        "Could not create the highlight at",
        this.props.referenceFilter
      );
      this.recursiveHighlightAdd(dummyHighlight);
    } else {
      console.log(
        "created highlight with id:",
        result.data,
        "on ",
        newHighlight.start_ref
      );
    }
  };

  recursiveHighlightDelete = async (highlight) => {
    const result = await userMarkup.deleteUserMarkup(
      highlight.id,
      this.props.username,
      "highlight"
    );

    if (!result.ok) {
      console.log(
        "Could not delete the highlight at",
        this.props.referenceFilter
      );
      this.recursiveHighlightDelete(highlight);
    } else {
      console.log(
        "deleted highlight with id:",
        highlight.id,
        "on ",
        highlight.start_ref
      );
    }
  };

  setCurrentHighlightToState() {
    let currentHighlight = this.props.currentHighlights.find(
      (h) => h.start_ref === this.props.referenceFilter
    );
    if (currentHighlight && !this.state.highlight) {
      this.setState({ highlight: currentHighlight });
    }
  }

  componentDidMount() {
    // console.log("componentDidMount:", this.props.referenceFilter);
    this.setCurrentHighlightToState();
  }

  // DON'T NEED THIS SINCE RE-RENDERS ARE NOT BASED ON PROPS
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.currentHighlights);
    // console.log(this.props.currentHighlights.length);

    if (prevState.highlight === this.state.highlight) {
      //also only call if current reference is visible one
      this.setCurrentHighlightToState();
    }
  }

  render() {
    const { text, verseBoxStyle, verseTextStyle } = this.props;

    return (
      <Text
        onLongPress={
          () => console.log(this.props.referenceFilter)
          // this.toggleHighlight
        }
        style={verseBoxStyle}
      >
        <AppText
          style={[
            verseTextStyle,
            this.state.highlight
              ? { backgroundColor: this.state.highlight.class_name }
              : { backgroundColor: "transparent" },
          ]}
        >
          {text}
        </AppText>
      </Text>
    );
  }
}
