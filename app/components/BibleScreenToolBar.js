import React, { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import BiblePicker from "../components/BiblePicker";

import colors from "../config/colors";
import BiblePickerItem from "./BiblePickerItem";
import AppText from "./Text";

export default function BibleScreenToolBar(props) {
  // const [sliderVisible, setSliderVisible] = useState(false);
  // const handleFontSize = () => setSliderVisible(!sliderVisible);
  const [historyVisible, setHistoryVisible] = useState(false);

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        position: "absolute",
        transform: [{ translateY: props.headerY }],
        width: "100%",
        zIndex: 1,
      }}
    >
      <BiblePicker
        currentBook={props.currentBook}
        currentChapter={props.currentChapter}
        currentVerse={props.currentVerse}
        changeBibleBook={props.changeBibleBook}
        // onSelectItem={(item) => props.changeBibleBook(item)}
        fontSize={props.fontSize}
        HEADER_HEIGHT={props.HEADER_HEIGHT}
        // placeholder="Category"
        PickerItemComponent={BiblePickerItem}
        bottomSheetRef={props.bottomSheetRef}
        searchHistoryRef={props.searchHistoryRef}
        setSettingsMode={props.setSettingsMode}
        setHistoryVisible={setHistoryVisible}
        topPanel={props.topPanel}
      />
      <View
        style={[
          {
            backgroundColor: colors.white,
            borderBottomWidth: 0.2,
            position: "relative",
            paddingHorizontal: 15,
            paddingVertical: 10,
            // width: "100%",
          },
          historyVisible ? null : { opacity: 0 },
        ]}
      >
        <AppText style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
          History
        </AppText>
        {props.searchHistoryComponent}
      </View>
    </Animated.View>
  );
}
