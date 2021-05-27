import React, { Component, PureComponent } from "react";

import userMarkup from "../api/userMarkup";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AppText from "./Text";

export default class Highlight extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    highlight: null,
  };

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
      console.log("Setting highlight");
      this.setState({ highlight: currentHighlight });
    }
  }

  componentDidMount() {
    this.setCurrentHighlightToState();
  }

  // DON'T NEED THIS SINCE RE-RENDERS ARE NOT BASED ON PROPS
  componentDidUpdate(prevProps, prevState) {
    if (prevState.highlight === this.state.highlight) {
      //AKA if this.props.currentHighlights changes
      //also only call if current reference is visible one
      this.setCurrentHighlightToState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.highlight !== nextState.highlight) {
      // console.log("highlight updated");
      return true;
    } else if (this.props.text !== nextProps.text) {
      // console.log("text updated");
      return true;
    } else if (
      this.props.verseTextStyle.fontSize !== nextProps.verseTextStyle.fontSize
    ) {
      // console.log("font size updated");
      return true;
    }
    return false;
    //!setCurrentHighlights
    //!text

    //currentHighlights
    //referenceFilter
    //verseTextStyle
    //username
  }

  render() {
    const { text, verseTextStyle } = this.props;

    return (
      <AppText
        style={[
          verseTextStyle,
          this.state.highlight
            ? { backgroundColor: this.state.highlight.class_name }
            : { backgroundColor: "transparent" },
        ]}
        onLongPress={
          // () => console.log(this.props.referenceFilter)
          this.toggleHighlight
        }
      >
        {text}
      </AppText>
    );
  }
}
