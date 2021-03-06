import React, { PureComponent } from "react";
import { FlatList, Text, View } from "react-native";

import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import SearchHistoryItem from "./lists/SearchHistoryItem";

export default class SearchHistory extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchHistory: props.data ?? [
        { id: 2, title: "elephant" },
        { id: 1, title: "giraffe" },
        { id: 0, title: "monkey" },
      ],
    };
  }

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.state.searchHistory.filter((m) => m.id !== item.id);

    this.setState({
      searchHistory: newList,
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

  renderSearchItem = ({ item }) => {
    return (
      <SearchHistoryItem
        title={item.title}
        onPress={() => console.log(item)}
        renderRightActions={() => (
          <ListItemDeleteAction onPress={() => this.handleDelete(item)} />
        )}
      />
    );
  };

  keyExtractor = (item) => item.id.toString();

  render() {
    return (
      <FlatList
        data={this.state.searchHistory}
        extraData={this.props}
        renderItem={this.renderSearchItem}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={() => this.listEmptyComponent()}
      />
    );
  }
}
