import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Component } from "react";

function VerseHyperlink({ cr }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigateBible(cr["for"]);
        }}
      >
        <AppText style={styles.verseLink}>{cr["text"] + ",\t\t"}</AppText>
      </TouchableOpacity>
    </>
  );
}

class CrossReferences extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, item } = this.props;

    return (
      <View style={{ marginBottom: 20 }}>
        {Array.isArray(item.crossrefs) ? (
          item.crossrefs.map((crossref) => (
            <AppText key={crossref["id"]} style={{ color: colors.text }}>
              {"\n" + crossref["title"] + "\t"}
              {Array.isArray(crossref["refs"]["ref"]) ? (
                crossref["refs"]["ref"].map((cr) => (
                  <VerseHyperlink key={cr["for"]} cr={cr} />
                ))
              ) : (
                <VerseHyperlink
                  key={crossref["for"]}
                  cr={crossref["refs"]["ref"]}
                />
              )}
            </AppText>
          ))
        ) : item.crossrefs["title"] == "" ? null : (
          <AppText style={{ color: colors.text }}>
            {"\n" + item.crossrefs["title"] + "\t"}
            {Array.isArray(item.crossrefs["refs"]["ref"]) ? (
              item.crossrefs["refs"]["ref"].map((cr) => (
                <VerseHyperlink key={cr["for"]} cr={cr} />
              ))
            ) : (
              <VerseHyperlink
                key={item.crossrefs["for"]}
                cr={item.crossrefs["refs"]["ref"]}
              />
            )}
          </AppText>
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
    const { item } = this.props;
    return item.content !== nextProps.item.content;
  }

  render() {
    const {
      carousel,
      colors,
      currentBook,
      item,
      fontSize,
      crossRefSize,
      bottomSheetRef,
      style,
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
              {currentBook.label + " " + item.chapter + " : " + item.title}
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
          {item.content}
        </AppText>
        <CrossReferences item={item} colors={colors} />

        {/* <PanelBox
          carousel={carousel}
          // colors={colors}
          fontSize={fontSize}
          johnsNote={item.johnsNote}
          crossRefSize={crossRefSize}
          // paragraphBibleRef={paragraphBibleRef}
          bottomSheetRef={bottomSheetRef}
          // landscape={landscape}
        ></PanelBox> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  verseLink: {
    color: "#00aeef",
  },
});
