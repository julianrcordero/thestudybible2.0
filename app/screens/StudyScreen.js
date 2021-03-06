import React from "react";
import { FlatList, View } from "react-native";

import { useTheme } from "../config/ThemeContext";
import VerseCard from "../components/VerseCard";

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

  // const componentDidMount() {
  //   console.log("componentDidMount StudyScreen");
  // }

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const style = {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    // flex: 1,
    paddingHorizontal: 30,
    width: width,
  };

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
        johnsNote={item.johnsNote}
        key={index}
        style={style}
        title={item.title}
      />
    );
  };

  return (
    <>
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        // extraData={this.state}
        getItemLayout={getItemLayout}
        horizontal={true}
        initialNumToRender={5}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        onStartShouldSetResponderCapture={() => console.log("Vertical Scroll")}
        ref={carousel}
        removeClippedSubviews
        renderItem={renderVerseCardItem}
        // scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        snapToInterval={width}
        // style={{
        //   backgroundColor: colors.white,
        // }}
        updateCellsBatchingPeriod={25}
        windowSize={11}
      />

      {/* NOT SURE WHY */}
      <View
        style={{
          // backgroundColor: colors.light,
          height: 500,
          position: "relative",
        }}
      ></View>
    </>
  );
}
