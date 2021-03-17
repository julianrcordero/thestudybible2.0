import React, { PureComponent, useRef, useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";

import { useTheme } from "../config/ThemeProvider";
import VerseCard from "../components/VerseCard";
import AppText from "../components/Text";
import PanelBox from "../components/PanelBox";

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
        borderColor: colors.border,
        borderWidth: 0.3,
        paddingHorizontal: 30,
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

export default function StudyScreen({
  bottomSheetRef,
  carousel,
  currentBook,
  // crossrefSize,
  fontSize,
  verseList,
  width,
}) {
  const { colors } = useTheme();
  const [currentCrossrefs, setCurrentCrossrefs] = useState([]);
  const [currentJohnsNote, setCurrentJohnsNote] = useState([]);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const styles = StyleSheet.create({
    verseTextBox: {
      // backgroundColor: "orange",
      color: colors.text,
      fontSize: fontSize,
      paddingHorizontal: 30,
      width: width,
    },
    studyScreenBox: {
      backgroundColor: colors.background,
    },
  });

  const renderVerseCardItem = ({ item, index }) => {
    return (
      <VerseCard
        colors={colors}
        chapter={item.chapter}
        content={item.content}
        currentBook={currentBook}
        fontSize={fontSize}
        key={index}
        style={styles.verseTextBox}
        title={item.title}
      />
    );
  };

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      setCurrentCrossrefs(viewableItems.viewableItems[0].item.crossrefs);
      setCurrentJohnsNote(viewableItems.viewableItems[0].item.johnsNote);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  });

  return (
    <View style={styles.studyScreenBox}>
      {/* <View style={{ flexShrink: 1 }}> */}
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
      {/* </View> */}
      <CrossReferences crossrefs={currentCrossrefs} />
      <PanelBox
        colors={colors}
        fontSize={fontSize}
        johnsNote={currentJohnsNote}
      ></PanelBox>
    </View>
  );
}
