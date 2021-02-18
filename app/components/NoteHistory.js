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
import { useTheme } from "../config/ThemeContext";

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
import SearchHistoryItem from "./lists/SearchHistoryItem";
import NoteHistoryItem from "./NoteHistoryItem";

export default class NoteHistory extends PureComponent {
  constructor(props) {
    super(props);
  }

  listEmptyComponent = () => (
    <View
      style={{
        // borderWidth: 1,
        height: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>No note history</Text>
    </View>
  );

  render() {
    const { carousel, noteHistory, handleDelete } = this.props;
    return noteHistory.map((item) => (
      <NoteHistoryItem
        carousel={carousel}
        key={item.id.toString()}
        handleDelete={() => handleDelete(item)}
        date={item.title}
        subTitle={item.description}
        onPress={() => console.log(item)}
        open={item.open}
      />
    ));
  }
}
