import React, { PureComponent } from "react";
import { Button, StyleSheet, View } from "react-native";
import AppText from "./Text";
import { useTheme } from "../config/ThemeContext";

import Collapsible from "react-native-collapsible";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer } from "@react-navigation/native";
import SearchHistory from "./SearchHistory";

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
                  cardStyle: {
                    // backgroundColor: this.props.darkMode
                    //   ? colors.medium
                    //   : colors.light,
                  },
                }}
              />

              <Stack.Screen
                name="Chapters"
                component={ChaptersGridScreen}
                options={({ route }) => ({
                  cardStyle: {
                    // backgroundColor: this.props.darkMode
                    //   ? colors.medium
                    //   : colors.light,
                  },
                  headerRight: () => (
                    <AppText style={styles.sectionTitle}>
                      {route.params.title}
                    </AppText>
                  ),
                  headerRightContainerStyle: {
                    // color: this.props.darkMode ? colors.medium : colors.light,
                  },
                  headerStyle: {
                    // backgroundColor: this.props.darkMode
                    //   ? colors.medium
                    //   : colors.light,

                    height: 55,
                  },
                  headerTitle: "",
                })}
                initialParams={{
                  // darkMode: this.props.darkMode,
                  topPanel: this.close,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 1:
        return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="BooksList"
                options={{
                  headerShown: false,
                  title: "Books",
                  cardStyle: {
                    // backgroundColor: this.props.darkMode
                    //   ? colors.medium
                    //   : colors.light,
                  },
                }}
              >
                {() => (
                  <BooksListScreen
                    books={this.props.books}
                    changeBibleBook={this.props.changeBibleBook}
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
    const { darkMode, height } = this.props;

    return (
      <Collapsible
        align={"center"}
        collapsed={this.state.collapsed}
        style={{
          // backgroundColor: darkMode ? colors.medium : colors.white,
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
            onChange={(event) => {
              this.setState({
                pickerType: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={{
              // backgroundColor: darkMode ? colors.secondary : colors.light,
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
