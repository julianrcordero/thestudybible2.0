import React, { Component } from "react";
import {
  View,
  StyleSheet,
  InteractionManager,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./Text";

class BiblePicker extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
    searchOn: false,
  };

  _toggleSettings = () => {
    this.props.headerContentRef.current.setState({ settingsMode: true });
    this.props.bottomSheetContentRef.current.setState({ settingsMode: true });
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.props.bottomSheetRef.current.snapTo(1);
      });
    });
    () => interactionPromise.cancel();
  };

  toggleSearch = () => {
    this.setState({ searchOn: !this.state.searchOn });
    this.props.toolBar.current?.setState({
      historyVisible: !this.state.searchOn,
    });
  };

  search = (search) => {
    const currentSearchHistory = this.props.searchHistoryRef.current;

    const newSearchHistory = [
      { id: currentSearchHistory.state.searchHistory.length, title: search },
      ...currentSearchHistory.state.searchHistory,
    ];
    currentSearchHistory.setState({ searchHistory: newSearchHistory });
  };

  openPicker = () => {
    this.props.topPanel.current.setState({ collapsed: false });
  };

  render() {
    const {
      colors,
      currentBook,
      currentChapter,
      fontFamily,
      fontSize,
      HEADER_HEIGHT,
      placeholder,
      topPanel,
    } = this.props;

    // const { colors, isDark } = useTheme();

    styles = StyleSheet.create({
      cancel: {
        alignItems: "center",
        aspectRatio: 0.75,
        justifyContent: "center",
      },
      icon: {
        alignItems: "center",
        justifyContent: "center",
      },
      placeholder: {
        // color: colors.medium,
        flex: 1,
      },
      reference: {
        alignItems: "center",
        flex: 5.5,
        flexDirection: "row",
        justifyContent: "center",
      },

      rightButtons: {
        // flexDirection: "row",
        flex: 3,
        justifyContent: "center",
        marginRight: 15,
      },
      search: {
        alignItems: "center",
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
        borderWidth: 0.3,
        // borderColor: colors.medium,
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 4,
      },
    });

    return (
      <View
        style={{
          backgroundColor: colors.background,
          // borderColor: colors.medium,
          borderBottomWidth: 0.3,
          flexDirection: "row",
          height: HEADER_HEIGHT,
          flex: 1,
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
                  backgroundColor: colors.background,
                  borderColor: "#000",
                  borderRadius: 10,
                  borderWidth: 0.3,
                }
              : null,
          ]}
        >
          <TouchableOpacity style={styles.search} onPress={this.toggleSearch}>
            <MaterialCommunityIcons
              name="magnify"
              color={colors.icon}
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
                  color={colors.icon}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                onPress={this.openPicker}
                style={styles.reference}
              >
                <AppText
                  style={{
                    color: colors.icon,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {
                    currentBook.label + " " + currentChapter // +" : " +currentVerse
                  }
                </AppText>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color={colors.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Text
                  style={[
                    styles.translationText,
                    { borderColor: colors.icon, color: colors.icon },
                  ]}
                >
                  NASB
                </Text>
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
                  color={colors.icon}
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={this._toggleSettings}
              >
                <MaterialCommunityIcons
                  name="format-letter-case"
                  color={colors.icon}
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

export default BiblePicker;
