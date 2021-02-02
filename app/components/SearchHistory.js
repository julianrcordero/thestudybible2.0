import React, { PureComponent } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import colors from "../config/colors";
import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import BooksGridScreen from "../screens/BooksGridScreen";
import BooksListScreen from "../screens/BooksListScreen";
import ChaptersGridScreen from "../screens/ChaptersGridScreen";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import SegmentedControl from "@react-native-community/segmented-control";
import { NavigationContainer } from "@react-navigation/native";

export default class SearchHistory extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchHistory: [
        { id: 0, title: "monkey" },
        { id: 1, title: "giraffe" },
        { id: 2, title: "elephant" },
      ],
    };
  }

  renderSearchItem = ({ item, index, separators }) => {
    return (
      <ListItem
        title={item.title}
        description={item.description}
        image={item.image}
        onPress={() => console.log("Message selected", item)}
        renderRightActions={() => (
          <ListItemDeleteAction onPress={() => handleDelete(item)} />
        )}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.searchHistory}
        renderItem={this.renderSearchItem}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "green" }}
      />
    );
  }
}
