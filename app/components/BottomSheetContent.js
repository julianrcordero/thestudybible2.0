import React, { Component, PureComponent } from "react";

import Screen from "../components/Screen";
import { SettingsScreen } from "../screens/SettingsScreen";
import StudyScreen from "../screens/StudyScreen";

class BottomSheetContent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    settingsMode: false,
  };

  render() {
    const {
      bibleScreen,
      top,
      paragraphBibleRef,
      carousel,
      favoriteRef,
      studyScreen,
      setVerseList,
      studyToolBar,
      topPanel,
      user,
      verseList,
      width,
    } = this.props;

    return (
      <Screen flex={0}>
        {this.state.settingsMode ? (
          <SettingsScreen
            bibleScreen={bibleScreen}
            top={top}
            paragraphBibleRef={paragraphBibleRef}
          />
        ) : (
          <StudyScreen
            carousel={carousel}
            favoriteRef={favoriteRef}
            fontFamily={"Avenir"}
            fontSize={16}
            ref={studyScreen}
            // referenceFilter={referenceFilter}
            // setReferenceFilter={setReferenceFilter}
            setVerseList={setVerseList}
            studyToolBar={studyToolBar}
            topPanel={topPanel}
            user={user}
            verseList={verseList}
            width={width}
          />
        )}
      </Screen>
    );
  }
}

export default BottomSheetContent;
