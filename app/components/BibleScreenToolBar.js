import React, { useState, Component } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import BiblePicker from "../components/BiblePicker";

import { useTheme } from "../config/ThemeProvider";

import BiblePickerItem from "./BiblePickerItem";
import AppText from "./Text";
import SearchHistory from "./SearchHistory";

export default class BibleScreenToolBar extends Component {
  constructor(props) {
    super(props);
  }

  state = { historyVisible: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.headerY !== nextProps.headerY) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.currentBook !== nextProps.currentBook) {
      return true;
    } else if (this.props.currentChapter !== nextProps.currentChapter) {
      return true;
    } else if (this.props.currentVerse !== nextProps.currentVerse) {
      return true;
    } else if (this.props.darkMode !== nextProps.darkMode) {
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    }
    return false;
  }
  // const [historyVisible, setHistoryVisible] = useState(false);

  // const { colors, isDark } = useTheme();

  render() {
    const {
      headerY,
      bottomSheetContentRef,
      colors,
      currentBook,
      currentChapter,
      currentVerse,
      darkMode,
      fontFamily,
      fontSize,
      headerContentRef,
      headerOpacity,
      HEADER_HEIGHT,
      paragraphBibleRef,
      bottomSheetRef,
      searchHistoryRef,
      topPanel,
    } = this.props;

    return (
      <Animated.View
        style={{
          justifyContent: "center",
          opacity: headerOpacity,
          position: "absolute",
          transform: [{ translateY: headerY }],
          width: "100%",
          zIndex: 1,
        }}
      >
        <BiblePicker
          bottomSheetContentRef={bottomSheetContentRef}
          colors={colors}
          currentBook={currentBook}
          currentChapter={currentChapter}
          currentVerse={currentVerse}
          darkMode={darkMode}
          fontFamily={fontFamily}
          fontSize={fontSize}
          headerContentRef={headerContentRef}
          HEADER_HEIGHT={HEADER_HEIGHT}
          paragraphBibleRef={paragraphBibleRef}
          // placeholder="Category"
          PickerItemComponent={BiblePickerItem}
          bottomSheetRef={bottomSheetRef}
          searchHistoryRef={searchHistoryRef}
          // setHistoryVisible={setHistoryVisible}
          topPanel={topPanel}
        />
        {
          <View
            style={[
              {
                backgroundColor: colors.secondary,
                paddingHorizontal: 15,
              },
              this.state.historyVisible
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
            <SearchHistory ref={searchHistoryRef} />
          </View>
        }
      </Animated.View>
    );
  }
}
