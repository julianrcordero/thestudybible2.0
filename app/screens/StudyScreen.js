import React, {
  Component,
  PureComponent,
  useEffect,
  useRef,
  useState,
  createRef,
} from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import userMarkup from "../api/userMarkup";

import { useTheme } from "../config/ThemeProvider";
import AppText from "../components/Text";
import PanelBox from "../components/PanelBox";
import Favorite from "../components/Favorite";
import VerseFormatted from "../components/VerseFormatted";
import useAuth from "../auth/useAuth";
import referenceCode from "../hooks/referenceCode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Highlight from "../components/Highlight";
import AppButton from "../components/Button";

function Reference({ book, fontFamily, fontSize, reference }) {
  const { colors } = useTheme();
  const myStyle = {
    color: colors.text,
    fontFamily: fontFamily,
    fontSize: fontSize * 1.1,
    fontWeight: "bold",
    textAlign: "left",
  };

  return <AppText style={myStyle}>{book + " " + reference}</AppText>;
}

const goToVerse = () => {};

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = {
    verseLink: {
      color: "#00aeef",
    },
  };

  render() {
    const { cr } = this.props;
    return (
      <TouchableOpacity onPress={goToVerse}>
        <AppText style={this.styles.verseLink}>{cr["text"] + ",\t\t"}</AppText>
      </TouchableOpacity>
    );
  }
}

function CrossRef({ myObject }) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <AppText style={{ color: colors.text }}>
        {myObject["title"] + "\t"}
      </AppText>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {Array.isArray(myObject["refs"]["ref"]) ? (
          myObject["refs"]["ref"].map((cr) => (
            <VerseHyperlink key={cr["for"]} cr={cr} />
          ))
        ) : (
          <VerseHyperlink key={myObject["for"]} cr={myObject["refs"]["ref"]} />
        )}
      </View>
    </View>
  );
}

export default class StudyScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let myUser = this.props.user;
    this.loadUserMarkup(this.props.user);
    this.setState({ user: myUser });
  }

  componentDidUpdate(prevProps, prevState) {}

  async loadUserMarkup(user) {
    const myMarkup = await userMarkup.getUserMarkup(user.sub);
    if (myMarkup) {
      console.log("User markup loaded");
      const data = myMarkup.data;
      let bookNotes = data.notes.filter(
        (n) => n.refs[0].start_ref.toString().slice(0, -6) == "1"
      );
      let bookFavorites = data.favorites.filter(
        (n) => n.start_ref.toString().slice(0, -6) == "1"
      );
      let bookHighlights = data.highlights.filter(
        (n) => n.start_ref.toString().slice(0, -6) == "1"
      );

      this.setState({
        currentNotes: bookNotes,
        currentFavorites: bookFavorites,
        currentHighlights: bookHighlights,
      });
      console.log("User markup set in StudyScreen state");

      // console.log(bookHighlights);
    }
  }

  // async sendVerseToToolBar(chapter, title) {
  //   await studyToolBar.current.setState({
  //     currentVerse: this.referenceCode(chapter, title),
  //   });
  // }

  state = {
    currentNotes: [],
    currentFavorites: [],
    currentHighlights: [],

    currentReference: "1 : 1",
    referenceFilter: "01001001",
    currentCrossrefs: [],
    currentJohnsNote: [],

    colorPaletteVisible: false,

    user: null,
  };

  getItemLayout = (data, index) => ({
    length: this.props.width,
    offset: this.props.width * index,
    index,
  });

  keyExtractor = (item, index) => item + index;

  referenceCode = (chapter, verse) => {
    return Number(
      "01" + ("000" + chapter).substr(-3) + ("000" + verse).substr(-3)
    );
  };

  setCurrentFavorites = (newArray) => {
    this.setState({ currentFavorites: newArray });
  };

  setCurrentHighlights = (newArray) => {
    this.setState({ currentHighlights: newArray });
  };

  setCurrentNotes = (newArray) => {
    this.setState({ currentNotes: newArray });
  };

  toggleColorPalette = () => {
    this.setState({
      colorPaletteVisible: this.state.colorPaletteVisible ? false : true,
    });
  };

  onViewRef = (viewableItems) => {
    if (viewableItems.viewableItems[0]) {
      const v = viewableItems.viewableItems[0];

      this.setState({
        currentReference: v.item.chapter + " : " + v.item.title,
        currentCrossrefs: v.item.crossrefs,
        referenceFilter: referenceCode(v.item.chapter, v.item.title),
        // "01" +
        // ("000" + v.item.chapter).substr(-3) +
        // ("000" + v.item.title).substr(-3),
        currentJohnsNote: v.item.johnsNote,
      });
      // sendVerseToToolBar(v.item.chapter, v.item.title);
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  };

  styles = StyleSheet.create({
    referenceBox: {
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 60,
      paddingLeft: 30,
      paddingRight: 60,
      paddingVertical: this.props.fontSize,
      width: this.props.width,
    },
    verseBox: {
      paddingBottom: this.props.fontSize,
      paddingHorizontal: 30,
      width: this.props.width,
    },
    verseText: {
      fontFamily: this.props.fontFamily,
      fontSize: this.props.fontSize,
      lineHeight: this.props.fontSize * 2,
    },
  });

  renderVerseCardItem = ({ item, i }) => {
    return (
      <Highlight
        // colorPaletteVisible={this.state.colorPaletteVisible}
        currentHighlights={this.state.currentHighlights}
        setCurrentHighlights={this.setCurrentHighlights}
        referenceFilter={this.referenceCode(item.chapter, item.title)}
        verseBoxStyle={this.styles.verseBox}
        verseTextStyle={this.styles.verseText}
        text={item.content}
        username={this.props.user.sub}
      />
    );
  };

  render() {
    const {
      carousel,
      currentBook,
      favoriteRef,
      fontFamily,
      fontSize,
      studyToolBar,
      verseList,
      width,
    } = this.props;

    return (
      <View style={{ height: "100%" }}>
        <View style={this.styles.referenceBox}>
          {/* {this.state.colorPaletteVisible ? (
            <View
              style={{
                backgroundColor: "black",
                height: 24,
                width: 100,
              }}
            ></View>
          ) : ( */}
          <Reference
            book={currentBook.label}
            reference={this.state.currentReference}
            fontFamily={fontFamily}
            fontSize={fontSize}
          />
          <AppButton
            onPress={() => this.loadUserMarkup(this.state.user)}
            title={"Reload user data"}
            style={{ width: 100 }}
          ></AppButton>
          <Favorite
            currentFavorites={this.state.currentFavorites}
            favorite={this.state.currentFavorites.find(
              (f) => f.start_ref == this.state.referenceFilter
            )}
            ref={favoriteRef}
            referenceFilter={this.state.referenceFilter}
            setCurrentFavorites={this.setCurrentFavorites}
            user={this.props.user}
          />
        </View>
        <View style={{ flexShrink: 1 }}>
          <FlatList
            bounces={false}
            data={verseList}
            decelerationRate={"fast"}
            // extraData={this.state}
            getItemLayout={this.getItemLayout}
            horizontal={true}
            initialNumToRender={5}
            keyExtractor={this.keyExtractor}
            maxToRenderPerBatch={3}
            onViewableItemsChanged={this.onViewRef}
            ref={carousel}
            removeClippedSubviews
            renderItem={this.renderVerseCardItem}
            // scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"center"}
            snapToInterval={width}
            updateCellsBatchingPeriod={25}
            viewabilityConfig={this.viewConfigRef}
            windowSize={11}
          />
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}
        >
          {Array.isArray(this.state.currentCrossrefs) ? (
            this.state.currentCrossrefs.map((crossref) => (
              <CrossRef key={crossref["id"]} myObject={crossref} />
            ))
          ) : this.state.currentCrossrefs["title"] == "" ? null : (
            <CrossRef myObject={this.state.currentCrossrefs} />
          )}
        </View>
        <PanelBox
          currentNotes={this.state.currentNotes}
          fontSize={fontSize}
          johnsNote={this.state.currentJohnsNote}
          notes={this.state.currentNotes.filter(
            (m) => m.refs[0].start_ref == this.state.referenceFilter
          )}
          referenceFilter={this.state.referenceFilter}
          setCurrentNotes={this.setCurrentNotes}
        ></PanelBox>
      </View>
    );
  }
}
