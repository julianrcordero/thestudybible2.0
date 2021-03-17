import React, { PureComponent } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AppText from "./Text";

import Collapsible from "react-native-collapsible";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer } from "@react-navigation/native";
import SearchHistory from "./SearchHistory";

import bookPaths from "../json/bible/Bible"; //../json/bible/Bible";

import reactStringReplace from "react-string-replace";
import VerseFormatted from "../components/VerseFormatted";

const notesArray = JSON.parse(
  JSON.stringify(require("../json/bible/esvmsb.notes.json"))
)["crossway-studynotes"]["book"];

const crossrefsJsonObject = JSON.parse(
  JSON.stringify(require("../json/bible/GenesisCrossrefs.json"))
)["book"];

class TopSheetNavigation extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
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
                    changeBibleBook={this.changeBibleBook}
                    close={this.close}
                    goBack={true}
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
                    changeBibleBook={this.changeBibleBook}
                    close={this.close}
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

  changeBibleBook = (newBook) => {
    if (this.props.currentBook !== newBook) {
      this.props.setCurrentBook(newBook);
      var bibleJsonString = JSON.stringify(bookPaths[newBook.label]);
      var bibleJsonObject = JSON.parse(bibleJsonString);

      let verses = [];
      let johnsNote = "";
      let crossrefs = "";
      const chapters = bibleJsonObject["crossway-bible"]["book"]["chapter"];
      const notes = notesArray[newBook.value - 1]["note"];

      const bookSections = [];
      chapters.map((chapter) => {
        chapter["verse"].forEach((verse) => {
          let note = notes.find(
            (el) =>
              el["_start"] ===
              "n" +
                "01" +
                ("000" + chapter["_num"]).substr(-3) +
                ("000" + verse["_num"]).substr(-3)
          );

          if (note) {
            const pTag = note["content"]["p"][0];
            const parsedNote = pTag["a"]
              ? reactStringReplace(pTag["__text"], /\n/g, (match, i) => (
                  <Text key={i}>
                    <Text style={{ fontSize: 12, lineHeight: 10 }}>
                      {Array.isArray(pTag["a"])
                        ? "REF1" //pTag["a"][0]["__text"] //"a" is always an array
                        : "REF2"}
                    </Text>
                    {match}
                  </Text>
                ))
              : reactStringReplace(pTag["__text"], /\n/, (match, i) => (
                  <Text key={i}>{"REF3"}</Text>
                ));
            johnsNote = parsedNote;
          } else {
            johnsNote = "There is no note for this passage";
          }

          let crossrefList = crossrefsJsonObject["chapter"][
            Number(chapter["_num"]) - 1
          ]["verse"].find(
            (el) =>
              el["id"] ===
              "01" +
                ("000" + chapter["_num"]).substr(-3) +
                ("000" + verse["_num"]).substr(-3)
          );

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
            content: verse, //VerseFormatted(verse, 12),
            johnsNote: johnsNote,
            // loved: false,
            crossrefs: crossrefs,
          });
        });

        Array.isArray(chapter["heading"])
          ? bookSections.push({
              chapterNum: Number(chapter["_num"]),
              title: chapter["heading"][0],
              data: chapter["verse"],
            })
          : bookSections.push({
              chapterNum: Number(chapter["_num"]),
              title: chapter["heading"],
              data: chapter["verse"],
            });
      });
      this.props.setSections(bookSections);
      this.props.setVerseList(verses);
    }
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
