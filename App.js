import React, { useState, useRef } from "react";
import { Dimensions } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "./app/config/ThemeProvider";

import AppNavigator from "./app/navigation/AppNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import Screen from "./app/components/Screen";

import ReanimatedBottomSheet from "reanimated-bottom-sheet";
import { enableScreens } from "react-native-screens";
enableScreens();
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

import TopSheetNavigation from "./app/components/TopSheetNavigation";
import BottomSheetHeader from "./app/components/BottomSheetHeader";
import BottomSheetContent from "./app/components/BottomSheetContent";
import useAuth from "./app/auth/useAuth";

//View -> UIView
export default function App() {
  const top = height - Constants.statusBarHeight;

  const bibleSectionsRef = useRef();
  const bibleScreen = useRef();
  const bottomSheetRef = useRef();
  const bottomSheetContentRef = useRef();
  const carousel = useRef();
  const favoriteRef = useRef();
  const headerContentRef = useRef();
  const paragraphBibleRef = useRef();
  const searchHistoryRef = useRef();
  const studyScreen = useRef();
  const studyToolBar = useRef();
  const toolBar = useRef();
  const topPanel = useRef();

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
    }
  };

  const snapToZero = () => {
    bottomSheetRef.current.snapTo(2);
  };

  const bottomSheetHeader = () => (
    <BottomSheetHeader
      bottomSheetContentRef={bottomSheetContentRef}
      favoriteRef={favoriteRef}
      headerContentRef={headerContentRef}
      snapToZero={snapToZero}
      studyScreen={studyScreen}
      studyToolBar={studyToolBar}
    />
  );

  const bottomSheetContent = () => (
    <BottomSheetContent
      bibleScreen={bibleScreen}
      carousel={carousel}
      favoriteRef={favoriteRef}
      paragraphBibleRef={paragraphBibleRef}
      height={top - getBottomSpace() - 40}
      ref={bottomSheetContentRef}
      studyScreen={studyScreen}
      studyToolBar={studyToolBar}
      topPanel={topPanel}
      user={user}
      width={width}
    />
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
    <AppearanceProvider>
      <ThemeProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <Screen style={{ position: "absolute", width: "100%", zIndex: 200 }}>
            <TopSheetNavigation
              bibleSectionsRef={bibleSectionsRef}
              bibleScreen={bibleScreen}
              height={top - getBottomSpace()}
              paragraphBibleRef={paragraphBibleRef}
              ref={topPanel}
              searchHistoryRef={searchHistoryRef}
              studyScreen={studyScreen}
              topPanel={topPanel}
              width={width}
            />
          </Screen>

          <Screen>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator
                bibleSectionsRef={bibleSectionsRef}
                bibleScreen={bibleScreen}
                bottomSheetRef={bottomSheetRef}
                bottomSheetContentRef={bottomSheetContentRef}
                carousel={carousel}
                headerContentRef={headerContentRef}
                paragraphBibleRef={paragraphBibleRef}
                searchHistoryRef={searchHistoryRef}
                studyScreen={studyScreen}
                toolBar={toolBar}
                topPanel={topPanel}
              />
            </NavigationContainer>
          </Screen>

          <ReanimatedBottomSheet
            ref={bottomSheetRef}
            snapPoints={[top, "45%", "0%"]}
            initialSnap={2}
            renderHeader={bottomSheetHeader}
            renderContent={bottomSheetContent}
            // onCloseEnd={() => setFocusedVerse(null)}
          />
        </AuthContext.Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
