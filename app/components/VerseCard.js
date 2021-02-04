import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";
import PanelBox from "../components/PanelBox";
import AppText from "../components/Text";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class VerseCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loved: false,
    };
  }

  render() {
    const {
      carousel,
      currentBook,
      item,
      fontSize,
      crossRefSize,
      // paragraphBibleRef,
      bottomSheetRef,
      style,
    } = this.props;

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

    return (
      <View style={style}>
        <View
          style={{
            alignItems: "center",
            // backgroundColor: "green",
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ alignContent: "flex-start", flexDirection: "column" }}>
            <AppText
              style={{
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
            fontSize: fontSize,
            lineHeight: fontSize * 2,
          }}
        >
          {item.content}
        </AppText>
        <View style={{ marginBottom: 20 }}>
          {Array.isArray(item.crossrefs) ? (
            item.crossrefs.map((crossref) => (
              <AppText key={crossref["id"]}>
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
            <AppText>
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

        <PanelBox
          carousel={carousel}
          fontSize={fontSize}
          johnsNote={item.johnsNote}
          crossRefSize={crossRefSize}
          // paragraphBibleRef={paragraphBibleRef}
          bottomSheetRef={bottomSheetRef}
          // landscape={landscape}
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
