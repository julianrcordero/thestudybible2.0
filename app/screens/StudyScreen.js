import React, { PureComponent, useRef, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTheme } from "../config/ThemeProvider";
import VerseCard from "../components/VerseCard";
import AppText from "../components/Text";

const goToVerse = () => {
  console.log("goToVerse");
  // navigateBible(cr["for"]);
};

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    verseLink: {
      color: "#00aeef",
    },
  });

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
    <AppText
      style={{
        color: colors.text,
      }}
    >
      {myObject["title"] + "\t"}
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

function CrossReferences({ crossrefs }) {
  return (
    <View
      style={{
        justifyContent: "space-around",
        marginBottom: 20,
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
  crossrefSize,
  fontSize,
  verseList,
  width,
}) {
  const { colors } = useTheme();
  const [currentCrossrefs, setCurrentCrossrefs] = useState([]);

  // const componentDidMount() {
  //   console.log("componentDidMount StudyScreen");
  // }

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const styles = StyleSheet.create({
    // crossRefsBox: {flex: 1},
    verseTextBox: {
      color: colors.text,
      // flexGrow: 1,
      // flexShrink: 1,
      fontSize: fontSize,
      // height: 100,
      paddingHorizontal: 30,
      width: width,
    },
    studyScreenBox: {
      backgroundColor: colors.background,
      borderWidth: 0.5,
      flexGrow: 1,
      // flex: 1,
      // paddingHorizontal: 30,
      // width: width,
    },
  });

  const renderVerseCardItem = ({ item, index }) => {
    // console.log(item.chapter + " : " + item.title);
    return (
      <VerseCard
        bottomSheetRef={bottomSheetRef}
        colors={colors}
        carousel={carousel}
        chapter={item.chapter}
        content={item.content}
        crossrefs={item.crossrefs}
        currentBook={currentBook}
        crossrefSize={crossrefSize}
        fontSize={fontSize}
        // johnsNote={item.johnsNote}
        key={index}
        style={styles.verseTextBox}
        title={item.title}
      />
    );
  };

  const onViewRef = useRef((viewableItems) => {
    // console.log("Visible items are", viewableItems.viewableItems[0]);
    if (viewableItems.viewableItems[0])
      setCurrentCrossrefs(viewableItems.viewableItems[0].item.crossrefs);
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
      <CrossReferences crossrefs={currentCrossrefs} />
    </View>
  );
}
