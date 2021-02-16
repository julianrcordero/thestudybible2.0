import React, { useState } from "react";
import { Button, Dimensions, FlatList, View, Switch, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./app/navigation/AppNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import colors from "./app/config/colors";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Screen from "./app/components/Screen";
import BottomSheetToolBar from "./app/components/BottomSheetToolBar";
import VerseCard from "./app/components/VerseCard";

import BottomSheet from "reanimated-bottom-sheet";
import { enableScreens } from "react-native-screens";
enableScreens();
import Collapsible from "react-native-collapsible";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";

import { createStackNavigator } from "@react-navigation/stack";
import TopSheetNavigation from "./app/components/TopSheetNavigation";
import SearchHistory from "./app/components/SearchHistory";
import SettingsScreen from "./app/screens/SettingsScreen";
const Stack = createStackNavigator();
const { height, width } = Dimensions.get("window");

//View -> UIView
export default function App() {
  const top = height - Constants.statusBarHeight;
  const bottomSheetHeaderHeight = 50;
  const verseCardReferenceHeight = 50;

  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Avenir");
  const [formatting, setFormatting] = useState("Default");
  const [darkMode, setDarkMode] = useState(false);
  const crossrefSize = 12;

  const topPanel = React.useRef();

  const searchHistoryRef = React.useRef();

  const [settingsMode, setSettingsMode] = useState(false);
  const [verseList, setVerseList] = useState([]);
  const carousel = React.useRef();

  const books = [
    {
      label: "Genesis",
      short: "Ge",
      value: 1,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Exodus",
      short: "Ex",
      value: 2,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Leviticus",
      short: "Le",
      value: 3,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Numbers",
      short: "Nu",
      value: 4,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Deuteronomy",
      short: "Dt",
      value: 5,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    {
      label: "Joshua",
      short: "Jos",
      value: 6,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Judges",
      short: "Jdg",
      value: 7,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Ruth",
      short: "Ru",
      value: 8,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Samuel",
      short: "1Sa",
      value: 9,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Samuel",
      short: "2Sa",
      value: 10,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Kings",
      short: "1Ki",
      value: 11,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Kings",
      short: "2Ki",
      value: 12,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "I Chronicles",
      short: "1Ch",
      value: 13,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "II Chronicles",
      short: "2Ch",
      value: 14,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Ezra",
      short: "Ezr",
      value: 15,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Nehemiah",
      short: "Ne",
      value: 16,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Esther",
      short: "Es",
      value: 17,
      backgroundColor: "#F9E4B7",
      icon: "apps",
    },
    {
      label: "Job",
      short: "Job",
      value: 18,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Psalms",
      short: "Ps",
      value: 19,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Proverbs",
      short: "Pr",
      value: 20,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Ecclesiastes",
      short: "Ec",
      value: 21,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Song of Solomon",
      short: "So",
      value: 22,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Isaiah",
      short: "Is",
      value: 23,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Jeremiah",
      short: "Je",
      value: 24,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Lamentations",
      short: "La",
      value: 25,
      backgroundColor: "#CDEBF9",
      icon: "apps",
    },
    {
      label: "Ezekiel",
      short: "Eze",
      value: 26,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Daniel",
      short: "Da",
      value: 27,
      backgroundColor: "#FFC0CB",
      icon: "apps",
    },
    {
      label: "Hosea",
      short: "Ho",
      value: 28,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Joel",
      short: "Joe",
      value: 29,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Amos",
      short: "Am",
      value: 30,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Obadiah",
      short: "Ob",
      value: 31,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Jonah",
      short: "Jon",
      value: 32,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Micah",
      short: "Mic",
      value: 33,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Nahum",
      short: "Na",
      value: 34,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Habbakuk",
      short: "Hab",
      value: 35,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Zephaniah",
      short: "Zep",
      value: 36,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Haggai",
      short: "Hag",
      value: 37,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Zachariah",
      short: "Zec",
      value: 38,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Malachi",
      short: "Mal",
      value: 39,
      backgroundColor: "#89F0AA",
      icon: "apps",
    },
    {
      label: "Matthew",
      short: "Mt",
      value: 40,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Mark",
      short: "Mk",
      value: 41,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Luke",
      short: "Lk",
      value: 42,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "John",
      short: "Jn",
      value: 43,
      backgroundColor: "#89F0DE",
      icon: "apps",
    },
    {
      label: "Acts",
      short: "Ac",
      value: 44,
      backgroundColor: "#F0AA89",
      icon: "apps",
    },
    {
      label: "Romans",
      short: "Ro",
      value: 45,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Corinthians",
      short: "1Co",
      value: 46,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Corinthians",
      short: "2Co",
      value: 47,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Galatians",
      short: "Ga",
      value: 48,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Ephesians",
      short: "Eph",
      value: 49,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Philippians",
      short: "Php",
      value: 50,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Colossians",
      short: "Col",
      value: 51,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Thessalonians",
      short: "1Th",
      value: 52,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Thessalonians",
      short: "2Th",
      value: 53,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "I Timothy",
      short: "1Ti",
      value: 54,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "II Timothy",
      short: "2Ti",
      value: 55,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Titus",
      short: "Tt",
      value: 56,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Philemon",
      short: "Phm",
      value: 57,
      backgroundColor: "#b5cde1",
      icon: "apps",
    },
    {
      label: "Hebrews",
      short: "Heb",
      value: 58,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "James",
      short: "Jas",
      value: 59,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "I Peter",
      short: "1Pe",
      value: 60,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "II Peter",
      short: "2Pe",
      value: 61,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "I John",
      short: "1Jn",
      value: 62,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "II John",
      short: "2Jn",
      value: 63,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "III John",
      short: "3Jn",
      value: 64,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "Jude",
      short: "Jud",
      value: 65,
      backgroundColor: "#FFDB58",
      icon: "apps",
    },
    {
      label: "Revelation",
      short: "Re",
      value: 66,
      backgroundColor: "#58d0ff",
      icon: "apps",
    },
  ];
  const [currentBook, setCurrentBook] = useState(books[0]);
  const [] = useState(1);
  const [] = useState(1);

  const paragraphBibleRef = React.useRef();

  const bottomSheetRef = React.useRef(null);

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const snapToHalf = () => {
    bottomSheetRef.current.snapTo(2);
  };

  const renderSettingsHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.light }]}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Text Settings</Text>

      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderSettingsContent = () => (
    <SettingsScreen
      top={top}
      paragraphBibleRef={paragraphBibleRef}
      setFontSize={setFontSize}
      setFontFamily={setFontFamily}
      setFormatting={setFormatting}
      setDarkMode={setDarkMode}
    />
  );

  const renderBibleHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.white }]}>
      <BottomSheetToolBar />
      <Button
        title="Done"
        onPress={snapToHalf}
        style={{ textAlign: "center" }}
      />
    </View>
  );

  const renderVerseCardItem = ({ item, index }) => {
    return (
      <VerseCard
        key={index}
        carousel={carousel}
        currentBook={currentBook}
        item={item}
        crossrefSize={crossrefSize}
        fontSize={fontSize}
        bottomSheetRef={bottomSheetRef}
        style={{ borderWidth: 0.5, paddingHorizontal: 30, width: width }}
        verseCardReferenceHeight={verseCardReferenceHeight}
      />
    );
  };

  const renderBibleContent = () => (
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
        style={{
          backgroundColor: colors.white,
        }}
      />

      {/* NOT SURE WHY */}
      <View
        style={{
          backgroundColor: colors.light,
          height: 500,
          position: "relative",
        }}
      ></View>
    </View>
  );

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <SafeAreaProvider>
      <Screen style={{ position: "absolute", width: "100%", zIndex: 200 }}>
        <TopSheetNavigation
          books={books}
          ref={topPanel}
          height={top - getBottomSpace()}
          width={width}
          searchHistoryRef={searchHistoryRef}
        />
      </Screen>

      <NavigationContainer ref={navigationRef}>
        <Screen>
          <AuthContext.Provider value={{ user, setUser }}>
            <AppNavigator
              formatting={formatting}
              bottomSheetRef={bottomSheetRef}
              carousel={carousel}
              crossrefSize={crossrefSize}
              currentBook={currentBook}
              darkMode={darkMode}
              fontFamily={fontFamily}
              fontSize={fontSize}
              paragraphBibleRef={paragraphBibleRef}
              searchHistoryRef={searchHistoryRef}
              setSettingsMode={setSettingsMode}
              setVerseList={setVerseList}
              setCurrentBook={setCurrentBook}
              topPanel={topPanel}
              verseList={verseList}
            />
          </AuthContext.Provider>
        </Screen>
      </NavigationContainer>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[top, "50%", "0%"]}
        initialSnap={2}
        onStartShouldSetResponderCapture={() => console.log("ScrollView")}
        renderHeader={settingsMode ? renderSettingsHeader : renderBibleHeader}
        renderContent={
          settingsMode ? renderSettingsContent : renderBibleContent
        }
        // onCloseEnd={() => setFocusedVerse(null)}
      />
    </SafeAreaProvider>
  );
}

const styles = {
  header: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderTopWidth: 0.3,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  // button: {
  //   alignItems: "center",
  //   backgroundColor: colors.white,
  //   borderWidth: 0.5,
  //   borderColor: colors.medium,
  //   flex: 1,
  //   justifyContent: "center",
  //   marginHorizontal: 6,
  //   paddingVertical: 6,
  //   textAlign: "center",
  // },
  // settings: {
  //   marginTop: 25,
  //   width: "100%",
  // },
  // title: {
  //   marginVertical: 6,
  // },
};
