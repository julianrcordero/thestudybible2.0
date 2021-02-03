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
import SearchHistoryItem from "./lists/SearchHistoryItem";
import NoteHistoryItem from "./NoteHistoryItem";

export default class NoteHistory extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      noteHistory: props.data ?? [
        {
          id: 2,
          title: "Note 3, Wednesday",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: 1,
          title: "Note 2, Tuesday",
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
        },
        {
          id: 0,
          title: "Note 1, Monday",
          description:
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
        },
      ],
    };
  }

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.state.noteHistory.filter((m) => m.id !== item.id);

    this.setState({
      noteHistory: newList,
    });
  };

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
      <Text>No search history</Text>
    </View>
  );

  renderSearchItem = ({ item, index, separators }) => {
    return (
      <NoteHistoryItem
        title={item.title}
        subTitle={item.description}
        onPress={() => console.log(item)}
        renderRightActions={() => (
          <ListItemDeleteAction onPress={() => this.handleDelete(item)} />
        )}
      />
    );
  };

  render() {
    return this.state.noteHistory.map((item) => (
      <NoteHistoryItem
        key={item.id.toString()}
        title={item.title}
        subTitle={item.description}
        onPress={() => console.log(item)}
        renderRightActions={() => (
          <ListItemDeleteAction onPress={() => this.handleDelete(item)} />
        )}
      />
    ));
    //   <FlatList
    //     data={this.state.noteHistory}
    //     extraData={this.props}
    //     renderItem={this.renderSearchItem}
    //     keyExtractor={(item) => item.id.toString()}
    //     ListEmptyComponent={() => this.listEmptyComponent()}
    //   />
  }
}
