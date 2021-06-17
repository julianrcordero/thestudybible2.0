import React, { Component, PureComponent } from "react";
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
// import VerseFormatted from "../components/VerseFormatted";
// import useAuth from "../auth/useAuth";
// import referenceCode from "../hooks/referenceCode";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import Highlight from "../components/Highlight";
// import AppButton from "../components/Button";
import reactStringReplace from "react-string-replace";

import defaultStyles from "../config/styles";
import { List, fromJS } from "immutable";
import bookPaths from "../json/Bible";
import books from "../json/Books";

const notesArray = fromJS(require("../json/esvmsb.notes.json")).getIn([
  "crossway-studynotes",
  "book",
]);

const crossrefsJsonObject = require("../json/GenesisCrossrefs.json")["book"];

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
        <Text style={this.styles.verseLink}>{cr.text + ",\t\t"}</Text>
      </TouchableOpacity>
    );
  }
}

class CrossRef extends Component {
  constructor(props) {
    super(props);
  }

  containerStyle = {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 12.5,
  };

  linkStyle = { flexWrap: "wrap", flexDirection: "row" };

  keyExtractor = (item, index) => item.for;

  render() {
    const { colors, myObject } = this.props;

    return (
      <View style={this.containerStyle}>
        <AppText style={{ color: colors.text }}>
          {myObject.title + "\t"}
        </AppText>
        <View style={this.linkStyle}>
          {Array.isArray(myObject.refs.ref) ? (
            myObject.refs.ref.map((cr) => (
              <VerseHyperlink key={cr.for} cr={cr} />
            ))
          ) : (
            <VerseHyperlink key={myObject.for} cr={myObject.refs.ref} />
          )}
        </View>
      </View>
    );
  }
}

function CrossRefList({ currentCrossrefs }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          marginVertical: 12.5,
        },
        defaultStyles.paddingText,
      ]}
    >
      {currentCrossrefs &&
        (Array.isArray(currentCrossrefs) ? (
          currentCrossrefs.map((crossref) => (
            <CrossRef colors={colors} key={crossref.id} myObject={crossref} />
          ))
        ) : currentCrossrefs.title === "" ? null : (
          <CrossRef colors={colors} myObject={currentCrossrefs} />
        ))}
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

    currentReference: "1 : 1",
    referenceFilter: "001001",
    currentCrossrefs: [],
    currentJohnsNote: [],

    colorPaletteVisible: false,

    fontSize: 18,
    fontFamily: "Avenir",

    user: null,
    verseList: [],
  };

  componentDidMount() {
    let bookTitle =
      this.props.bibleScreen.current?.state.currentBook ?? "Psalms";

    if (this.state.bookTitle !== bookTitle) {
      this.setState({
        bookTitle: bookTitle,
        bookFilter: books.find((b) => b.label === bookTitle).value,
      });
    }

    let myUser = this.props.user;
    this.loadUserMarkup(this.props.user);
    if (!this.state.user) {
      this.setState({ user: myUser });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.bookTitle !== this.state.bookTitle) {
      console.log("studyScreen bookTitle updated to", this.state.bookTitle);

      let newVerseList = [];
      let verseList = bookPaths[this.state.bookTitle].getIn([
        "crossway-bible",
        "book",
        "chapter",
      ]);

      verseList.map((chapter, i) => {
        chapter.get("verse").map((v, j) => {
          newVerseList.push({
            chapter: i + 1,
            verse: j + 1,
            text: v.get("crossref")
              ? reactStringReplace(v.get("#text"), /(\n)/g, (match, i) =>
                  List.isList(v.get("crossref"))
                    ? v.crossref.getIn([0, "_let"]) // can't index, quotes must be replaced with quote literals
                    : v.crossref.get("_let")
                )
              : reactStringReplace(
                  v.get("#text"),
                  /(\n)/g,
                  (match, i) => match
                ),
          });
        });
      });

      this.setState({
        bookFilter: books.find((b) => b.label === this.state.bookTitle).value,
        verseList: newVerseList,
      });
      console.log("studyScreen verseList updated!");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.bookTitle !== nextState.bookTitle) {
      return true;
    } else if (this.state.currentNotes !== nextState.currentNotes) {
      return true;
    } else if (this.state.currentFavorites !== nextState.currentFavorites) {
      return true;
    } else if (this.state.currentHighlights !== nextState.currentHighlights) {
      return true;
    } else if (this.state.currentCrossrefs !== nextState.currentCrossrefs) {
      return true;
    } else if (this.state.currentJohnsNote !== nextState.currentJohnsNote) {
      return true;
    } else if (this.state.currentReference !== nextState.currentReference) {
      return true;
    }
    // else if (this.state.user !== nextState.user) {
    //   return false;
    // }
    else if (this.state.verseList !== nextState.verseList) {
      return true;
    }

    return false;
  }

  async loadUserMarkup(user) {
    const myMarkup = await userMarkup.getUserMarkup(user.sub);
    if (myMarkup) {
      const data = myMarkup.data;
      let bookNotes = data.notes.filter(
        (n) =>
          n.refs[0].start_ref.toString().slice(0, -6) ==
          String(this.state.bookFilter)
      );
      let bookFavorites = data.favorites.filter(
        (n) =>
          n.start_ref.toString().slice(0, -6) == String(this.state.bookFilter)
      );
      let bookHighlights = data.highlights.filter(
        (n) =>
          n.start_ref.toString().slice(0, -6) == String(this.state.bookFilter)
      );

      this.setState({
        currentNotes: bookNotes,
        currentFavorites: bookFavorites,
        currentHighlights: bookHighlights,
      });
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

  keyExtractor = (item, index) => index.toString();

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
    const v = viewableItems.viewableItems[0];

    // johnsNote:
    //   note?.content.p[0].__text ?? "There is no note for this passage",
    // crossrefs: crossrefList?.letter,

    if (v) {
      let referenceCode =
        ("00" + this.state.bookFilter).substr(-2) +
        ("000" + v.item.chapter).substr(-3) +
        ("000" + v.item.verse).substr(-3);

      let crossrefList = crossrefsJsonObject?.chapter[
        this.state.bookFilter - 1
      ].verse.find((el) => el.id === referenceCode);

      let note = notesArray
        .getIn([this.state.bookFilter - 1, "note"])
        .find(
          (el) =>
            el.get("_start") === "n" + referenceCode &&
            !el.get("_id").includes("introduction")
        );

      this.setState({
        currentReference: v.item.chapter + " : " + v.item.verse,
        currentCrossrefs: crossrefList?.letter,
        referenceFilter: this.referenceCode(v.item.chapter, v.item.verse),
        currentJohnsNote:
          note?.getIn(["content", "p", 0, "__text"]) ??
          "There is no note for this passage",
      });
      // sendVerseToToolBar(v.item.chapter, v.item.verse);
    }
    // Use viewable items in state or as intended
  };
  viewConfigRef = {
    waitForInteraction: false,
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
      // paddingLeft: 30,
      paddingRight: 60,
      width: this.props.width,
    },
    verseBox: {
      // paddingHorizontal: 30,
      width: this.props.width,
    },
  });

  renderVerseCardItem = ({ item, i }) => {
    return (
      <Text
        style={[
          this.styles.verseBox,
          { paddingBottom: this.state.fontSize },
          defaultStyles.paddingText,
        ]}
      >
        <Highlight
          // colorPaletteVisible={this.state.colorPaletteVisible}
          currentHighlights={this.state.currentHighlights}
          setCurrentHighlights={this.setCurrentHighlights}
          referenceFilter={this.referenceCode(item.chapter, item.verse)}
          verseTextStyle={{
            fontFamily: this.state.fontFamily,
            fontSize: this.state.fontSize,
            lineHeight: this.state.fontSize * 2,
          }}
          text={item.text}
          username={this.state.user ? this.state.user.sub : ""}
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
            defaultStyles.paddingText,
          ]}
        >
          <Reference
            book={this.state.bookTitle}
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

        <CrossRefList currentCrossrefs={this.state.currentCrossrefs} />
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
