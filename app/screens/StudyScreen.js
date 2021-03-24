import React, { PureComponent, useEffect, useRef, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTheme } from "../config/ThemeProvider";
import AppText from "../components/Text";
import PanelBox from "../components/PanelBox";
import VerseFormatted from "../components/VerseFormatted";
import useAuth from "../auth/useAuth";

const goToVerse = () => {
  console.log("goToVerse");
};

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = {
    verseLink: {
      color: "#00aeef",
    },
  };

  render() {
    const { cr } = this.props;
    return (
      <TouchableOpacity onPress={goToVerse}>
        <AppText style={this.styles.verseLink}>{cr["text"] + ",\t\t"}</AppText>
      </TouchableOpacity>
    );
  }
}

function CrossRef({ myObject }) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <AppText style={{ color: colors.text }}>
        {myObject["title"] + "\t"}
      </AppText>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {Array.isArray(myObject["refs"]["ref"]) ? (
          myObject["refs"]["ref"].map((cr) => (
            <VerseHyperlink key={cr["for"]} cr={cr} />
          ))
        ) : (
          <VerseHyperlink key={myObject["for"]} cr={myObject["refs"]["ref"]} />
        )}
      </View>
    </View>
  );
}

function CrossReferences({ crossrefs }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        // borderColor: colors.border,
        // borderTopWidth: 0.3,
        marginHorizontal: 30,
      }}
    >
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

function Reference({ book, reference, style }) {
  return <AppText style={style}>{book + " " + reference}</AppText>;
}

export default function StudyScreen({
  carousel,
  currentBook,
  fontFamily,
  fontSize,
  verseList,
  width,
}) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const auth = useAuth();
  const [currentReference, setCurrentReference] = useState("1 : 1");
  const [currentCrossrefs, setCurrentCrossrefs] = useState([]);
  const [currentNotes, setCurrentNotes] = useState();
  const [referenceFilter, setReferenceFilter] = useState("01001001");
  const [currentJohnsNote, setCurrentJohnsNote] = useState([]);

  useEffect(() => {
    async function fetchUserMarkup() {
      const userMarkup = await auth.getUserMarkup(user);
      // console.log(userMarkup);
      setCurrentNotes(userMarkup.notes);
    }
    fetchUserMarkup();
  }, []);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const renderVerseCardItem = ({ item }) => {
    return (
      <Text style={styles.verseTextBox}>
        <VerseFormatted verse={item.content} crossrefSize={12} />
      </Text>
    );
  };

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];

      setCurrentReference(v.item.chapter + " : " + v.item.title);
      setCurrentCrossrefs(v.item.crossrefs);
      setReferenceFilter(
        "01" +
          ("000" + v.item.chapter).substr(-3) +
          ("000" + v.item.title).substr(-3)
      );
      setCurrentJohnsNote(v.item.johnsNote);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  });

  const styles = StyleSheet.create({
    referenceBox: {
      alignItems: "center",
      color: colors.text,
      fontFamily: fontFamily,
      fontSize: fontSize * 1.1,
      fontWeight: "bold",
      paddingHorizontal: 30,
      paddingVertical: fontSize,
      textAlign: "left",
      width: width,
    },
    verseTextBox: {
      color: colors.text,
      fontFamily: fontFamily,
      fontSize: fontSize,
      lineHeight: fontSize * 2,
      paddingBottom: fontSize,
      paddingHorizontal: 30,
      width: width,
    },
  });

  return (
    <>
      <Reference
        book={currentBook.label}
        reference={currentReference}
        fontSize={fontSize}
        style={styles.referenceBox}
      />
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        // extraData={this.state}
        getItemLayout={getItemLayout}
        horizontal={true}
        initialNumToRender={5}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={3}
        onViewableItemsChanged={onViewRef.current}
        ref={carousel}
        removeClippedSubviews
        renderItem={renderVerseCardItem}
        // scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        snapToInterval={width}
        updateCellsBatchingPeriod={25}
        viewabilityConfig={viewConfigRef.current}
        windowSize={11}
      />
      {currentCrossrefs && <CrossReferences crossrefs={currentCrossrefs} />}
      <View style={{ paddingHorizontal: 25 }}>
        <PanelBox
          fontSize={fontSize}
          notes={
            currentNotes
              ? currentNotes.filter(
                  (m) => m.refs[0].start_ref == referenceFilter
                )
              : null
          }
          johnsNote={currentJohnsNote}
        ></PanelBox>
      </View>
    </>
  );
}
