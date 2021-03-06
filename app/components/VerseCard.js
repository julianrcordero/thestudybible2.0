import React, { Component, PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";
import { useTheme } from "../config/ThemeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const goToVerse = () => {
  navigateBible(cr["for"]);
};

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { cr } = this.props;
    return (
      <TouchableOpacity onPress={goToVerse}>
        <AppText style={styles.verseLink}>{cr["text"] + ",\t\t"}</AppText>
      </TouchableOpacity>
    );
  }
}

function CrossRef({ myObject }) {
  const { colors } = useTheme();

  return (
    <AppText style={{ color: colors.text }}>
      {"\n" + myObject["title"] + "\t"}
      {Array.isArray(myObject["refs"]["ref"]) ? (
        myObject["refs"]["ref"].map((cr) => (
          <VerseHyperlink key={cr["for"]} cr={cr} />
        ))
      ) : (
        <VerseHyperlink key={myObject["for"]} cr={myObject["refs"]["ref"]} />
      )}
    </AppText>
  );
}

class CrossReferences extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { crossrefs } = this.props;

    return (
      <View style={{ marginBottom: 20 }}>
        {Array.isArray(crossrefs) ? (
          crossrefs.map((crossref) => (
            <CrossRef key={crossref["id"]} myObject={crossref} />
          ))
        ) : crossrefs["title"] == "" ? null : (
          <CrossRef myObject={crossrefs} />
        )}
      </View>
    );
  }
}

export default class VerseCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loved: false,
  };

  shouldComponentUpdate(nextProps) {
    const { content } = this.props;
    return content !== nextProps.content;
  }

  render() {
    const {
      carousel,
      chapter,
      colors,
      content,
      crossrefs,
      crossRefSize,
      currentBook,
      fontSize,
      johnsNote,
      style,
      title,
    } = this.props;

    return (
      <View style={style}>
        <View
          style={{
            alignItems: "center",
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ alignContent: "flex-start", flexDirection: "column" }}>
            <AppText
              style={{
                color: colors.text,
                fontSize: fontSize,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {currentBook.label + " " + chapter + " : " + title}
            </AppText>
            {this.state.loved ? (
              <MaterialCommunityIcons name="heart" color="red" size={22} />
            ) : null}
          </View>
        </View>

        <AppText
          style={{
            color: colors.text,
            fontSize: fontSize,
            lineHeight: fontSize * 2,
          }}
        >
          {content}
        </AppText>
        <CrossReferences crossrefs={crossrefs} />

        <PanelBox
          carousel={carousel}
          colors={colors}
          fontSize={fontSize}
          johnsNote={johnsNote}
          crossRefSize={crossRefSize}
        ></PanelBox>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  verseLink: {
    color: "#00aeef",
  },
});
