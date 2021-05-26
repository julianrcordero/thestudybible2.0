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

const notesArray = require("../json/bible/esvmsb.notes.json")[
  "crossway-studynotes"
]["book"];

const crossrefsJsonObject = require("../json/bible/GenesisCrossrefs.json")[
  "book"
];

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
      label: "Genesis",
      value: 1,
      backgroundColor: "#345171",
      icon: "apps",
    };
    this.setState({ currentBook: newBook });
    this.setSections(newBook);
    this.setVerses(newBook);
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
      console.log("topPanel verses update");
      this.props.studyScreen.current?.setState({
        bookFilter: this.state.currentBook.value,
        currentBook: this.state.currentBook,
        verseList: this.state.verses,
      });
    }
  }

  setSections = (newBook) => {
    let chapters =
      bookPaths[newBook.label]["crossway-bible"]["book"]["chapter"];

    let mySections = chapters.map((c) => {
      return {
        chapterNum: c["_num"],
        chapterHeading: c["heading"],
        verses: c["verse"].map((v) => {
          return {
            verseNum: v["_num"],
            verseText: v["crossref"]
              ? reactStringReplace(v["__text"], /(\n)/g, (match, i) =>
                  Array.isArray(v["crossref"])
                    ? v["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
                    : v["crossref"]["_let"]
                )
              : reactStringReplace(v["__text"], /(\n)/g, (match, i) => match),
          };
        }),
      };
    });

    this.setState({ sections: mySections });
    console.log("set sections");
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
    let verses = [];
    let johnsNote = "";
    let crossrefs = "";
    const notes = notesArray[newBook.value - 1]["note"];
    const chapters =
      bookPaths[newBook.label]["crossway-bible"]["book"]["chapter"];

    chapters.map((chapter) => {
      chapter["verse"].map((verse) => {
        let referenceCode =
          ("00" + newBook.value).substr(-2) +
          ("000" + chapter["_num"]).substr(-3) +
          ("000" + verse["_num"]).substr(-3);
        let noteCode = "n" + referenceCode;
        let note = notes.find(
          (el) =>
            el["_start"] === noteCode && !el["_id"].includes("introduction")
        );
        if (note) {
          const pTag = note["content"]["p"][0];
          const parsedNote = pTag["__text"];
          johnsNote = parsedNote;
        } else {
          johnsNote = "There is no note for this passage";
        }
        let crossrefList = crossrefsJsonObject["chapter"][
          Number(chapter["_num"]) - 1
        ]["verse"].find((el) => el["id"] === referenceCode);
        if (crossrefList) {
          crossrefs = crossrefList["letter"];
        } else {
          crossrefs = {
            title: "",
            text: "",
          };
        }
        verses.push({
          chapter: Number(chapter["_num"]),
          title: Number(verse["_num"]),
          content: verse["crossref"]
            ? reactStringReplace(verse["__text"], /(\n)/g, (match, i) =>
                Array.isArray(verse["crossref"])
                  ? verse["crossref"][0]["_let"] // can't index, quotes must be replaced with quote literals
                  : verse["crossref"]["_let"]
              )
            : reactStringReplace(verse["__text"], /(\n)/g, (match, i) => match),
          johnsNote: johnsNote,
          crossrefs: crossrefs,
        });
      });
    });

    this.setState({ verses: verses });
    console.log("set verses");
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
      this.setVerses(newBook);
    }
  };

  changeStudyScreenBook = () => {
    return this.state.verses;
  };

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
            values={["GRID", "LIST", "RECENT"]}
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
