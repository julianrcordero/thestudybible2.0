import React, { PureComponent } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";
import Collapsible from "react-native-collapsible";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer } from "@react-navigation/native";
import SearchHistory from "./SearchHistory";

export default class TopSheetNavigation extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    pickerType: 0,
    collapsed: true,
  };

  selectedPicker = () => {
    switch (this.state.pickerType) {
      case 0:
        return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="Books"
                component={BooksGridScreen}
                options={{ headerShown: false, title: "Books" }}
              />

              <Stack.Screen
                name="Chapters"
                component={ChaptersGridScreen}
                options={({ route }) => ({
                  headerRight: () => (
                    <AppText style={styles.sectionTitle}>
                      {route.params.title}
                    </AppText>
                  ),
                  headerStyle: {
                    height: 55,
                  },
                  headerTitle: "",
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 1:
        return (
          // <View style={{ backgroundColor: "red", height: 1000 }}></View>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen
                name="BooksList"
                // component={BooksListScreen}
                options={{ headerShown: false, title: "Books" }}
              >
                {() => (
                  <BooksListScreen
                    changeBibleBook={this.props.changeBibleBook}
                    close={() => this.setState({ collapsed: true })}
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

  render() {
    return (
      //   <Screen style={{ position: "absolute", zIndex: 200, width: "100%" }}>
      // <View style={{ position: "relative" }}>
      <Collapsible
        align={"center"}
        collapsed={this.state.collapsed}
        // collapsedHeight={-70}
        style={{
          backgroundColor: colors.white,
          // borderBottomWidth: 1,
          height: this.props.height, //height - top - 70 - getBottomSpace(),
          paddingHorizontal: 15,
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.white,
              height: 70,
              justifyContent: "space-between",
              flexDirection: "row",
              // width: width ,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select a Passage
            </Text>
            <Button
              title={"Cancel"}
              onPress={() => this.setState({ collapsed: true })}
            ></Button>
          </View>
          <SegmentedControl
            values={["GRID", "LIST", "RECENT"]}
            selectedIndex={this.state.pickerType}
            onChange={(event) => {
              this.setState({
                pickerType: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={{ backgroundColor: colors.light, height: 45 }}
          />
        </View>
        {this.selectedPicker()}
      </Collapsible>
      // </View>
      //   </Screen>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    alignItems: "center",
    aspectRatio: 0.8,
    // backgroundColor: "green",
    // flexShrink: 1,
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: colors.white,
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
    color: colors.black,
    fontWeight: "bold",
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
