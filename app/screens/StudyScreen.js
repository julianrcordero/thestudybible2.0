import React from "react";
import { FlatList, View } from "react-native";

import { useTheme } from "../config/ThemeContext";

import VerseCard from "../components/VerseCard";

export default function StudyScreen({
  bottomSheetRef,
  carousel,
  crossrefSize,
  currentBook,
  fontSize,
  verseCardReferenceHeight,
  verseList,
  width,
}) {
  const { colors, isDark } = useTheme();

  const renderVerseCardItem = ({ item, index }) => {
    return (
      <VerseCard
        colors={colors}
        key={index}
        carousel={carousel}
        currentBook={currentBook}
        item={item}
        crossrefSize={crossrefSize}
        fontSize={fontSize}
        bottomSheetRef={bottomSheetRef}
        style={{
          backgroundColor: colors.background,
          borderWidth: 0.5,
          paddingHorizontal: 30,
          width: width,
        }}
        verseCardReferenceHeight={verseCardReferenceHeight}
      />
    );
  };

  return (
    <View onStartShouldSetResponderCapture={() => console.log("")}>
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        horizontal={true}
        // initialNumToRender={5}
        keyExtractor={(item, index) => item + index}
        onStartShouldSetResponderCapture={() => console.log("Vertical Scroll")}
        ref={carousel}
        renderItem={renderVerseCardItem}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        snapToInterval={width}
        // style={{
        //   backgroundColor: colors.white,
        // }}
      />

      {/* NOT SURE WHY */}
      <View
        style={{
          // backgroundColor: colors.light,
          height: 500,
          position: "relative",
        }}
      ></View>
    </View>
  );
}
