import React, { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import BiblePicker from "../components/BiblePicker";

import { useTheme } from "../config/ThemeProvider";

import BiblePickerItem from "./BiblePickerItem";
import AppText from "./Text";
import SearchHistory from "./SearchHistory";

export default function BibleScreenToolBar(props) {
  // const [sliderVisible, setSliderVisible] = useState(false);
  // const handleFontSize = () => setSliderVisible(!sliderVisible);
  const [historyVisible, setHistoryVisible] = useState(false);

  const { colors, isDark } = useTheme();

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
        colors={colors}
        currentBook={props.currentBook}
        currentChapter={props.currentChapter}
        currentVerse={props.currentVerse}
        darkMode={props.darkMode}
        fontFamily={props.fontFamily}
        fontSize={props.fontSize}
        HEADER_HEIGHT={props.HEADER_HEIGHT}
        paragraphBibleRef={props.paragraphBibleRef}
        // placeholder="Category"
        PickerItemComponent={BiblePickerItem}
        bottomSheetRef={props.bottomSheetRef}
        searchHistoryRef={props.searchHistoryRef}
        setSettingsMode={props.setSettingsMode}
        setHistoryVisible={setHistoryVisible}
        topPanel={props.topPanel}
      />
      {
        <View
          style={[
            {
              backgroundColor: colors.secondary,
              paddingHorizontal: 15,
            },
            historyVisible
              ? { paddingVertical: 5, borderBottomWidth: 0.3 }
              : {
                  borderBottomWidth: 0,
                  height: 0,
                  paddingVertical: 0,
                },
          ]}
        >
          <AppText
            style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold" }}
          >
            History
          </AppText>
          <SearchHistory ref={props.searchHistoryRef} />
        </View>
      }
    </Animated.View>
  );
}
