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
      height,
      top,
      paragraphBibleRef,
      carousel,
      favoriteRef,
      studyScreen,
      studyToolBar,
      topPanel,
      user,
      width,
    } = this.props;

    return (
      <Screen flex={0}>
        {this.state.settingsMode ? (
          <SettingsScreen
            bibleScreen={bibleScreen}
            studyScreen={studyScreen}
            top={top}
            paragraphBibleRef={paragraphBibleRef}
          />
        ) : null}
        <StudyScreen
          carousel={carousel}
          favoriteRef={favoriteRef}
          height={height}
          ref={studyScreen}
          // referenceFilter={referenceFilter}
          // setReferenceFilter={setReferenceFilter}
          studyToolBar={studyToolBar}
          topPanel={topPanel}
          user={user}
          width={width}
        />
      </Screen>
    );
  }
}

export default BottomSheetContent;
