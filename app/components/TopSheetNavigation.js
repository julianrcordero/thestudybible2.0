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

import bookPaths from "../json/bible/Bible";

import reactStringReplace from "react-string-replace";
import parser from "fast-xml-parser";
import genesis from "../xml/Genesis.js";

var he = require("he");
var options = {
  attributeNamePrefix: "",
  // attrNodeName: "attr", //default is 'false'
  textNodeName: "text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: false,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: true,
  // attrValueProcessor: (val, attrName) => {
  //   return val;
  // },
  // tagValueProcessor: (val, tagName) => {
  //   return val;
  // },
  // attrValueProcessor: (val, attrName) =>
  //   he.decode(val, { isAttributeValue: true }), //default is a=>a
  // tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["heading", "verse"],
};

const notesArray = require("../json/bible/esvmsb.notes.json")[
  "crossway-studynotes"
].book;

const crossrefsJsonObject = require("../json/bible/GenesisCrossrefs.json").book;

class TopSheetNavigation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentBook: {
      label: "",
      short: "",
      value: 0,
      backgroundColor: "",
      icon: "",
    },
    pickerType: 0,
    collapsed: true,
    sections: [],
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
    let newBook = {
      label: "Ecclesiastes",
      value: 21,
      backgroundColor: "#345171",
      icon: "apps",
    };
    this.setState({ currentBook: newBook });
    this.setSections(newBook);
    // this.setVerses(newBook);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sections !== this.state.sections) {
      // console.log("topPanel sections update");
      this.props.paragraphBibleRef.current?.setState({
        sections: this.state.sections,
      });
    } else if (prevState.currentBook !== this.state.currentBook) {
      // console.log("topPanel currentBook update");
      this.props.bibleScreen.current?.setState({
        currentBook: this.state.currentBook,
      });
    } else if (prevState.verses !== this.state.verses) {
      this.props.studyScreen.current?.setState({
        bookFilter: this.state.currentBook.value,
        currentBook: this.state.currentBook,
        verseList: this.state.verses,
      });
    }
  }

  setSections = (newBook) => {
    if (parser.validate(genesis) === true) {
      //optional (it'll return an object in case it's not valid)
      var jsonObj = parser.parse(genesis, options);
      let sections = jsonObj["crossway-bible"][0].book[0].chapter;
      this.setState({ sections: sections });
      console.log("LOADED!");
    }
    // let chapters = bookPaths[newBook.label]["crossway-bible"].book.chapter;

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

    // this.setState({ sections: mySections });
  };

  // {
  //   "chapterNum": 4,
  //   "chapterHeading": "Cain and Abel",
  //   "verses": [
  //     {
  //       "verseNum": 1,
  //       "verseText": ["Now Adam knew Eve his wife, and she conceived and bore Cain, saying, ",//q1
  //       "I have gotten",
  //       " a man with the help of the ",
  //       "."]//q2
  //     }
  //   ]
  // }

  setVerses = (newBook) => {
    // console.log(newBook);
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

  // {
  //   chapterNum: 4,
  //   verseNum: 1,
  //   content: ["Now Adam knew Eve his wife, and she conceived and bore Cain, saying, ",
  //         "I have gotten",
  //         " a man with the help of the ",
  //         "."],
  //         johnsNote: "I'm John MacArthur and I approve this message.",
  //         crossrefs: [{
  //           title: "a",
  //           text: "",
  //         }, {
  //           title: "b",
  //           text: "",
  //         }]
  // }

  changeBibleBook = (newBook) => {
    if (this.state.currentBook.label !== newBook.label) {
      // console.log(this.state.currentBook.label, "-->", newBook.label);
      this.setState({ currentBook: newBook });
      this.setSections(newBook);
      // this.setVerses(newBook);
    }
  };

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
