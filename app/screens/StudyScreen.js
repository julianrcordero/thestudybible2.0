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
// import referenceCode from "../hooks/referenceCode";
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

const goToVerse = () => console.log("Clicked a verse");

class VerseHyperlink extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = {
    verseLink: {
      color: "#007AFF",
    },
  };

  render() {
    const { cr } = this.props;
    return (
      <TouchableOpacity onPress={goToVerse}>
        <Text style={this.styles.verseLink}>{cr["text"] + ",\t\t"}</Text>
      </TouchableOpacity>
    );
  }
}

function CrossRef({ myObject }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 12.5,
      }}
    >
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

  state = {
    currentNotes: [],
    currentFavorites: [],
    currentHighlights: [],

    currentBook: {
      label: "Genesis",
      short: "Ge",
      value: 1,
      backgroundColor: "#FFFB79",
      icon: "apps",
    },
    currentReference: "1 : 1",
    bookFilter: 1,
    referenceFilter: "001001",
    currentCrossrefs: [],
    currentJohnsNote: [],

    colorPaletteVisible: false,

    fontSize: 16,
    fontFamily: "Avenir",

    user: null,
    verseList: [],
  };

  componentDidMount() {
    let myUser = this.props.user;
    this.loadUserMarkup(this.props.user);
    if (!this.state.user) {
      this.setState({ user: myUser });
      console.log("just set user");
    }

    let currentBook = this.props.topPanel.current.state.currentBook;
    console.log(
      "componentDidMount() to",
      currentBook.label,
      "(StudyScreen.js)"
    );
    console.log(this.state.currentBook.label, "->", currentBook.label);
    if (this.state.currentBook.label !== currentBook.label) {
      this.setState({
        currentBook: currentBook,
      });
      console.log("changed currentBook");
      this.props.topPanel.current.changeStudyScreenBook(currentBook);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  async loadUserMarkup(user) {
    const myMarkup = await userMarkup.getUserMarkup(user.sub);
    if (myMarkup) {
      // console.log("User markup loaded");
      const data = myMarkup.data;
      let bookNotes = data.notes.filter(
        (n) =>
          n.refs[0].start_ref.toString().slice(0, -6) ==
          this.state.currentBook.value.toString()
      );
      let bookFavorites = data.favorites.filter(
        (n) =>
          n.start_ref.toString().slice(0, -6) ==
          this.state.currentBook.value.toString()
      );
      let bookHighlights = data.highlights.filter(
        (n) =>
          n.start_ref.toString().slice(0, -6) ==
          this.state.currentBook.value.toString()
      );

      this.setState({
        currentNotes: bookNotes,
        currentFavorites: bookFavorites,
        currentHighlights: bookHighlights,
      });
      // console.log("User markup set in StudyScreen state");

      // console.log(bookHighlights);
    }
  }

  // async sendVerseToToolBar(chapter, title) {
  //   await studyToolBar.current.setState({
  //     currentVerse: this.referenceCode(chapter, title),
  //   });
  // }

  getItemLayout = (data, index) => ({
    length: this.props.width,
    offset: this.props.width * index,
    index,
  });

  keyExtractor = (item, index) => item + index;

  referenceCode = (chapter, verse) => {
    return Number(
      this.state.bookFilter +
        ("000" + chapter).substr(-3) +
        ("000" + verse).substr(-3)
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
        referenceFilter: this.referenceCode(v.item.chapter, v.item.title),
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
      width: this.props.width,
    },
    verseBox: {
      paddingHorizontal: 30,
      width: this.props.width,
    },
  });

  renderVerseCardItem = ({ item, i }) => {
    return (
      <Text
        style={[this.styles.verseBox, { paddingBottom: this.state.fontSize }]}
      >
        <Highlight
          // colorPaletteVisible={this.state.colorPaletteVisible}
          currentHighlights={this.state.currentHighlights}
          setCurrentHighlights={this.setCurrentHighlights}
          referenceFilter={this.referenceCode(item.chapter, item.title)}
          verseTextStyle={{
            fontFamily: this.state.fontFamily,
            fontSize: this.state.fontSize,
            lineHeight: this.state.fontSize * 2,
          }}
          text={item.content}
          username={this.state.user.sub}
        />
      </Text>
    );
  };

  render() {
    const { carousel, favoriteRef, height, width } = this.props;

    return (
      <View style={{ minHeight: height }}>
        <View
          style={[
            this.styles.referenceBox,
            {
              paddingVertical: this.state.fontSize,
            },
          ]}
        >
          <Reference
            book={this.state.currentBook.label}
            reference={this.state.currentReference}
            fontFamily={this.state.fontFamily}
            fontSize={this.state.fontSize}
          />
          <Favorite
            currentFavorites={this.state.currentFavorites}
            favorite={this.state.currentFavorites.find(
              (f) => f.start_ref == this.state.referenceFilter
            )}
            ref={favoriteRef}
            referenceFilter={this.state.referenceFilter}
            setCurrentFavorites={this.setCurrentFavorites}
            user={this.state.user}
          />
        </View>
        <View style={{ minHeight: this.state.fontSize * 3 }}>
          <FlatList
            bounces={false}
            data={this.state.verseList}
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
            marginVertical: 12.5,
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
          fontSize={this.state.fontSize}
          johnsNote={this.state.currentJohnsNote}
          notes={this.state.currentNotes.filter(
            (m) => m.refs[0].start_ref == this.state.referenceFilter
          )}
          referenceFilter={this.state.referenceFilter}
          setCurrentNotes={this.setCurrentNotes}
          // style={{ minHeight: 400 }}
        ></PanelBox>
      </View>
    );
  }
}
