import React, { Component, PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";
import { useTheme } from "../config/ThemeProvider";

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

  styles = StyleSheet.create({
    basicTextStyle: {
      color: this.props.colors.text,
      fontSize: this.props.fontSize,
    },
  });

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
          styles.basicTextStyle,
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
        styles.basicTextStyle,
        {
          lineHeight: this.props.fontSize * 2,
        },
      ]}
    >
      {content}
    </AppText>
  );

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
        {/* <AppText
          style={{
            color: colors.text,
            fontSize: fontSize,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {currentBook.label + " " + chapter + " : " + title}
        </AppText> */}
        {this.reference(currentBook.label, chapter, title)}
        {this.verse(content)}
      </View>
      // <View style={style}>
      //   <View
      //     style={{
      //       alignItems: "center",
      //       height: 50,
      //       flexDirection: "row",
      //       justifyContent: "flex-start",
      //     }}
      //   >
      //     <View style={{ alignContent: "flex-start", flexDirection: "column" }}>
      //       <AppText
      //         style={{
      //           color: colors.text,
      //           fontSize: fontSize,
      //           fontWeight: "bold",
      //           textAlign: "left",
      //         }}
      //       >
      //         {currentBook.label + " " + chapter + " : " + title}
      //       </AppText>
      //       {this.state.loved ? (
      //         <MaterialCommunityIcons name="heart" color="red" size={22} />
      //       ) : null}
      //     </View>
      //   </View>

      //   <AppText
      //     style={{
      //       color: colors.text,
      //       fontSize: fontSize,
      //       lineHeight: fontSize * 2,
      //     }}
      //   >
      //     {content}
      //   </AppText>
      //   <CrossReferences crossrefs={crossrefs} />

      //   <PanelBox
      //     carousel={carousel}
      //     colors={colors}
      //     fontSize={fontSize}
      //     johnsNote={johnsNote}
      //     crossRefSize={crossRefSize}
      //   ></PanelBox>
      // </View>
    );
  }
}
// const styles = StyleSheet.create({
//   verseLink: {
//     color: "#00aeef",
//   },
// });
