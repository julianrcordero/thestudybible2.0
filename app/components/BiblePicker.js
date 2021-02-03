import React, { PureComponent, useRef } from "react";
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";

import { createStackNavigator } from "@react-navigation/stack";
import BooksGridScreen from "../screens/BooksGridScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";

import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
const { height, width } = Dimensions.get("window");

import Collapsible from "react-native-collapsible";
const Stack = createStackNavigator();

import SegmentedControl from "@react-native-community/segmented-control";
import BooksListScreen from "../screens/BooksListScreen";
import routes from "../navigation/routes";
import AppForm from "./forms/Form";

class BiblePicker extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
    searchOn: false,
  };

  _toggleSettings = () => {
    this.props.bottomSheetRef.current.snapTo(1);
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      // let myIndex = verseList.findIndex(
      //   (obj) => obj.chapter === chapter && obj.title === verse
      // );
      setTimeout(() => {
        this.props.setSettingsMode(true);
        // carousel.current.scrollToIndex({ animated: false, index: myIndex });
      });
    });
    () => interactionPromise.cancel();
  };

  toggleSearch = () => {
    this.setState({ searchOn: !this.state.searchOn });
    this.props.setHistoryVisible(!this.state.searchOn);
  };

  search = (search) => {
    const currentSearchHistory = this.props.searchHistoryRef.current;

    const newSearchHistory = [
      { id: currentSearchHistory.state.searchHistory.length, title: search },
      ...currentSearchHistory.state.searchHistory,
    ];
    currentSearchHistory.setState({ searchHistory: newSearchHistory });
  };

  render() {
    const {
      currentBook,
      currentChapter,
      changeBibleBook,
      fontSize,
      HEADER_HEIGHT,
      placeholder,
      setHistoryVisible,
      topPanel,
    } = this.props;

    return (
      <View
        style={{
          backgroundColor: colors.light,
          borderColor: colors.medium,
          borderBottomWidth: 0.2,
          flexDirection: "row",
          height: HEADER_HEIGHT,
          flex: 1,
          zIndex: 1,
          width: "100%",
        }}
      >
        <View
          style={[
            {
              flexDirection: "row",
              flex: 12,
              marginLeft: 15,
              marginRight: 5,
              marginVertical: 12,
            },
            this.state.searchOn
              ? {
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderRadius: 10,
                  borderWidth: 0.2,
                }
              : null,
          ]}
        >
          <TouchableOpacity style={styles.search} onPress={this.toggleSearch}>
            <MaterialCommunityIcons
              name="magnify"
              color={colors.black}
              size={26}
            />
          </TouchableOpacity>
          {this.state.searchOn ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                // justifyContent: "space-around",
              }}
            >
              <TextInput
                autoCapitalize={"none"}
                autoFocus
                icon={"search"}
                keyboardType="default"
                name="search"
                onSubmitEditing={
                  (event) => {
                    // console.log(event.nativeEvent.text);
                    this.search(event.nativeEvent.text);
                  }
                  // this.updateText( event.nativeEvent.text)
                }
                placeholder="Search"
                ref={(input) => {
                  this.TextInput = input;
                }}
                style={styles.searchBar}
              />
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => this.TextInput.clear()}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  color={colors.black}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: "row", marginRight: 5 }}>
              <TouchableOpacity
                onPress={() => topPanel.current.setState({ collapsed: false })}
                style={styles.reference}
              >
                <Text style={{ fontSize: fontSize }}>
                  {currentBook ? (
                    <AppText style={styles.referenceText}>
                      {
                        // currentBook.label + " " + currentChapter // +" : " +currentVerse
                        "Song of Solomon 1"
                      }
                    </AppText>
                  ) : (
                    <AppText style={styles.placeholder}>{placeholder}</AppText>
                  )}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color={defaultStyles.colors.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Text style={styles.translationText}>NASB</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.rightButtons}>
          {this.state.searchOn ? (
            <View style={{ justifyContent: "center" }}>
              <Button title={"Cancel"} onPress={this.toggleSearch}></Button>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons
                  name="speaker"
                  color={colors.black}
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={this._toggleSettings}
              >
                <MaterialCommunityIcons
                  name="format-letter-case"
                  color={colors.black}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cancel: {
    alignItems: "center",
    aspectRatio: 0.75,
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    // backgroundColor: "green",
    justifyContent: "center",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  reference: {
    alignItems: "center",
    flex: 5.5,
    flexDirection: "row",
    justifyContent: "center",
  },
  referenceText: {
    flex: 1,
    color: colors.black,
    fontWeight: "bold",
  },
  rightButtons: {
    // backgroundColor: "purple",
    // flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    marginRight: 15,
  },
  search: {
    alignItems: "center",
    // backgroundColor: "yellow",
    aspectRatio: 1,
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
  },
  titleCard: {},
  translationText: {
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: colors.medium,
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default BiblePicker;
