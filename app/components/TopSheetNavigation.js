import React, { Component } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppText from "./Text";

import Collapsible from "react-native-collapsible";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import SearchHistory from "./SearchHistory";

import bookPaths from "../json/Bible";
// import bookPaths from "../xml/Bible";
import reactStringReplace from "react-string-replace";
import { List } from "immutable";

var he = require("he");
var options = {
  attributeNamePrefix: "",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "text",
  ignoreAttributes: true,
  ignoreNameSpace: true,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false,
  // attrValueProcessor: (val, attrName) =>
  //   attrName === "let"
  //     ? console.log(val)
  //     : he.decode(val, { isAttributeValue: true }),
  // tagValueProcessor: (val, tagName) =>
  //   tagName === "crossref" ? console.log(val) : he.decode(val),
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  format: true,
  supressEmptyNode: true,
  stopNodes: ["heading", "verse"], //"crossref", "q", "note"],
};

// const notesArray = require("../json/esvmsb.notes.json")["crossway-studynotes"]
//   .book;

// const crossrefsJsonObject = require("../json/GenesisCrossrefs.json").book;

class TopSheetNavigation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentBook: null,
    // {
    //   label: "",
    //   short: "",
    //   value: 0,
    //   backgroundColor: "",
    //   icon: "",
    // }
    pickerType: 0,
    collapsed: true,
    isPlaying: false,
    sections: List([]),
    startingIndex: 0,
    verses: [],
  };

  close = () => this.setState({ collapsed: true });

  selectedPicker = () => {
    switch (this.state.pickerType) {
      case 0:
        return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="Books"
                component={BooksGridScreen}
                // initialParams={{
                //   topPanel: this.props.topPanel,
                // }}
                options={{
                  headerShown: false,
                  title: "Books",
                }}
              />

              <Stack.Screen
                name="Chapters"
                options={({ route }) => ({
                  cardStyle: {
                    backgroundColor: "transparent",
                  },
                  headerRight: () => (
                    <AppText style={styles.sectionTitle}>
                      {route.params.title}
                    </AppText>
                  ),
                  headerStyle: {
                    backgroundColor: "transparent",
                    height: 55,
                  },
                  headerTitle: "",
                })}
              >
                {(props) => (
                  <ChaptersGridScreen
                    {...props}
                    bibleScreen={this.props.bibleScreen}
                    paragraphBibleRef={this.props.paragraphBibleRef}
                    topPanel={this.props.topPanel}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 1:
        return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="BooksList"
                options={({ route }) => ({
                  headerShown: false,
                  title: "Books",
                  cardStyle: {
                    // backgroundColor: this.props.darkMode
                    //   ? colors.medium
                    //   : colors.light,
                  },
                })}
              >
                {(props) => (
                  <BooksListScreen
                    {...props}
                    paragraphBibleRef={this.props.paragraphBibleRef}
                    topPanel={this.props.topPanel}
                    width={this.props.width - 30}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 2:
        return (
          <SearchHistory
            data={this.props.searchHistoryRef.current.state.searchHistory}
          />
        );
      default:
        break;
    }
  };

  componentDidMount() {
    if (!this.state.currentBook) {
      this.setState({
        currentBook: bookPaths["Ecclesiastes"]["crossway-bible"].book,
      });
      // this.setSections(0);
      // let newBook = {
      //   label: "Ecclesiastes",
      //   value: 21,
      //   backgroundColor: "#345171",
      //   icon: "apps",
      // };
      // this.setVerses(newBook);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sections !== this.state.sections) {
      let paragraphBible = this.props.paragraphBibleRef.current;

      paragraphBible?.setState({
        // index: this.state.startingIndex,
        // dataProvider: paragraphBible?.provideData.cloneWithRows(
        //   this.state.sections
        // ),
        sections: this.state.sections,
      });
    } else if (prevState.currentBook !== this.state.currentBook) {
      if (this.state.sections.length === 0) {
        this.setSections(0);
      }
    }
    // else if (prevState.verses !== this.state.verses) {
    //   this.props.studyScreen.current?.setState({
    //     bookFilter: this.state.currentBook.value,
    //     currentBook: this.state.currentBook,
    //     verseList: this.state.verses,
    //   });
    // }
  }

  setSections = (chapterIndex) => {
    // let myBook = bookPaths[newBook];
    // console.log(myBook);
    //optional (it'll return an object in case it's not valid)
    // var jsonObj = parser.parse(myBook, options);
    // let sections = jsonObj["crossway-bible"].book.chapter[chapterIndex];

    // let chapters = this.state.currentBook.chapter; //["crossway-bible"].book.chapter;

    // let sections = [];
    // for (let i = 0; i <= 0; i++) {
    //   let theoreticalIndex = chapterIndex + i;
    //   if (theoreticalIndex >= 0 && theoreticalIndex < chapters.length)
    //     sections.push({
    //       chapter: theoreticalIndex + 1,
    //       heading: Array.isArray(chapters[chapterIndex + i].heading)
    //         ? chapters[chapterIndex + i].heading[0]
    //         : chapters[chapterIndex + i].heading,
    //       verses: chapters[chapterIndex + i].verse.map((v) => {
    //         return Array.isArray(v["#text"])
    //           ? v["#text"].map((text) => {
    //               return text;
    //             })
    //           : v["#text"];
    //       }),
    //     });
    // }

    // let chapter = myBook["crossway-bible"].book.chapter[chapterIndex].verse;
    // let mySections = chapters.map((c) => {
    //   return {
    //     chapterHeading: c.heading,
    //     verses: c.verse.map((v) => {
    //       return Array.isArray(v["#text"])
    //         ? v["#text"].map((text) => {
    //             return text;
    //           })
    //         : v["#text"];
    //       // v.crossref
    //       //   ? reactStringReplace(v["#text"], /(\n)/g, (match, i) =>
    //       //       Array.isArray(v.crossref)
    //       //         ? v.crossref[0]._let // can't index, quotes must be replaced with quote literals
    //       //         : v.crossref._let
    //       //     )
    //       //   : reactStringReplace(v["#text"], /(\n)/g, (match, i) => match);
    //     }),
    //   };
    // });

    // let slicedSection =
    //   chapterIndex - 1 >= 0
    //     ? this.state.currentBook.chapter.slice(
    //         chapterIndex - 1,
    //         chapterIndex + 2
    //       )
    //     : this.state.currentBook.chapter.slice(0, 3);

    this.setState({
      sections: List(this.state.currentBook.chapter),
      // startingIndex: chapterIndex,
    });
  };

  setVerses = (newBook) => {
    let verses = [];
    const notes = notesArray[newBook.value - 1].note;
    const chapters = bookPaths[newBook.label]["crossway-bible"].book.chapter;

    chapters.map((chapter, i) => {
      chapter.verse.map((v, j) => {
        let referenceCode =
          ("00" + newBook.value).substr(-2) +
          ("000" + (i + 1)).substr(-3) +
          ("000" + (j + 1)).substr(-3);

        let note = notes.find(
          (el) =>
            el._start === "n" + referenceCode &&
            !el._id.includes("introduction")
        );
        let crossrefList = crossrefsJsonObject?.chapter[i].verse.find(
          (el) => el.id === referenceCode
        );

        verses.push({
          chapter: i + 1,
          verse: j + 1,
          text: v.crossref
            ? reactStringReplace(v["#text"], /(\n)/g, (match, i) =>
                Array.isArray(v.crossref)
                  ? v.crossref[0]._let // can't index, quotes must be replaced with quote literals
                  : v.crossref._let
              )
            : reactStringReplace(v["#text"], /(\n)/g, (match, i) => match),
          johnsNote:
            note?.content.p[0].__text ?? "There is no note for this passage",
          crossrefs: crossrefList?.letter,
        });
      });
    });

    this.setState({ verses: verses });
  };

  // changeBibleBook = (newBook, chapterIndex) => {
  //   if (this.state.currentBook !== newBook) {
  //     // console.log(this.state.currentBook, "-->", newBook);
  //     this.setState({ currentBook: newBook });
  //     // this.setVerses(newBook);
  //   }
  //   this.setSections(chapterIndex);
  // };

  changeStudyScreenBook = () => {
    return this.state.verses;
  };

  values = ["GRID", "LIST", "RECENT"];

  styles = StyleSheet.create({
    search: {
      alignItems: "center",
      aspectRatio: 0.8,
      justifyContent: "center",
    },
    searchBar: {
      // backgroundColor: colors.white,
      marginRight: 5,
      marginVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    icon: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },

    reference: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
    referenceText: {
      flex: 1,
      // color: colors.black,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 20,
    },
    titleCard: {},
    translationText: {
      borderRadius: 4,
      borderWidth: 0.3,
      // borderColor: colors.medium,
      fontSize: 12,
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
  });

  render() {
    const { height } = this.props;

    return (
      <Collapsible
        align={"center"}
        collapsed={this.state.collapsed}
        style={{
          // backgroundColor: colors.background,
          height: height,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              // backgroundColor: darkMode ? colors.medium : colors.white,
              height: 70,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                // color: darkMode ? colors.light : colors.dark,
              }}
            >
              Select a Passage
            </AppText>
            <Button title={"Cancel"} onPress={this.close}></Button>
          </View>
          <SegmentedControl
            values={this.values}
            selectedIndex={this.state.pickerType}
            // tintColor={"green"}
            onChange={(event) => {
              this.setState({
                pickerType: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={{
              height: 45,
            }}
          />
        </View>
        {this.selectedPicker()}
      </Collapsible>
    );
  }
}

export default TopSheetNavigation;

//for sectionList
// changeBibleBook = (newBook) => {
//   if (this.state.currentBook.label !== newBook.label) {
//     const chapters =
//       bookPaths[newBook.label]["crossway-bible"]["book"]["chapter"];
//     const sections = [];

//     chapters.map((chapter) => {
//       sections.push({
//         chapter: chapter["_num"],
//         title: Array.isArray(chapter["heading"])
//           ? chapter["heading"][0]
//           : chapter["heading"],
//         data: chapter["verse"],
//       });
//     });

//     this.props.paragraphBibleRef.current.setState({
//       sections: sections,
//     });

//     let bibleScreen = this.props.bibleScreen;
//     if (bibleScreen.current)
//       bibleScreen.current.setState({ currentBook: newBook });

//     this.setState({ currentBook: newBook });
//   }
// };

// pTag["a"]
//   ? reactStringReplace(pTag["__text"], /\n/g, (match, i) => (
//       <Text key={i}>
//         <Text style={{ fontSize: 12, lineHeight: 10 }}>
//           {Array.isArray(pTag["a"])
//             ? "REF1" //pTag["a"][0]["__text"] //"a" is always an array
//             : "REF2"}
//         </Text>
//         {match}
//       </Text>
//     ))
//   : reactStringReplace(pTag["__text"], /\n/, (match, i) => (
//       <Text key={i}>{"REF3"}</Text>
//     ));
