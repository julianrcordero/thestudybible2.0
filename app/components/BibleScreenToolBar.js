import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import BiblePicker from "../components/BiblePicker";
import CategoryPickerItem from "../components/CategoryPickerItem";

import colors from "../config/colors";
import BiblePickerItem from "./BiblePickerItem";
import SearchHistory from "./SearchHistory";
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
          historyVisible ? { opacity: 0 } : null,
        ]}
      >
        <AppText style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
          History
        </AppText>
        <SearchHistory />
      </View>
    </Animated.View>
  );
}
