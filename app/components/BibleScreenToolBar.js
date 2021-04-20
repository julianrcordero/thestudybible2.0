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
      // console.log("headerY");
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      // console.log("colors");
      return true;
    } else if (this.props.currentBook !== nextProps.currentBook) {
      // console.log("currentBook");
      return true;
    } else if (this.props.currentChapter !== nextProps.currentChapter) {
      // console.log("currentChapter");
      return true;
    } else if (this.props.currentVerse !== nextProps.currentVerse) {
      // console.log("currentVerse");
      return true;
    } else if (this.props.darkMode !== nextProps.darkMode) {
      // console.log("darkMode");
      return true;
    } else if (this.props.fontFamily !== nextProps.fontFamily) {
      // console.log("fontFamily");
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      // console.log("fontSize");
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

// export default function BibleScreenToolBar(props) {
//   const [historyVisible, setHistoryVisible] = useState(false);

//   const { colors, isDark } = useTheme();

//   return (
//     <Animated.View
//       style={{
//         justifyContent: "center",
//         position: "absolute",
//         transform: [{ translateY: props.headerY }],
//         width: "100%",
//         zIndex: 1,
//       }}
//     >
//       <BiblePicker
//         bottomSheetContentRef={props.bottomSheetContentRef}
//         colors={colors}
//         currentBook={props.currentBook}
//         currentChapter={props.currentChapter}
//         currentVerse={props.currentVerse}
//         darkMode={props.darkMode}
//         fontFamily={props.fontFamily}
//         fontSize={props.fontSize}
//         headerContentRef={props.headerContentRef}
//         HEADER_HEIGHT={props.HEADER_HEIGHT}
//         paragraphBibleRef={props.paragraphBibleRef}
//         // placeholder="Category"
//         PickerItemComponent={BiblePickerItem}
//         bottomSheetRef={props.bottomSheetRef}
//         searchHistoryRef={props.searchHistoryRef}
//         setHistoryVisible={setHistoryVisible}
//         topPanel={props.topPanel}
//       />
//       {
//         <View
//           style={[
//             {
//               backgroundColor: colors.secondary,
//               paddingHorizontal: 15,
//             },
//             historyVisible
//               ? { paddingVertical: 5, borderBottomWidth: 0.3 }
//               : {
//                   borderBottomWidth: 0,
//                   height: 0,
//                   paddingVertical: 0,
//                 },
//           ]}
//         >
//           <AppText
//             style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold" }}
//           >
//             History
//           </AppText>
//           <SearchHistory ref={props.searchHistoryRef} />
//         </View>
//       }
//     </Animated.View>
//   );
// }
