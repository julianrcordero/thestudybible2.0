import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Icon from "../../components/Icon";
import ListItem from "../../components/lists/BibleListItem";

import { useTheme } from "../../config/ThemeProvider";

import ListItemSeparatorComponent from "../../components/lists/ListItemSeparator";

const menuItems = [
  {
    title: "My listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

function BibleMoreScreen({ route, navigation }) {
  const { colors, isDark } = useTheme();
  const { AccessToken } = route.params;

  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      IconComponent={
        <Icon
          name={item.icon.name}
          backgroundColor={item.icon.backgroundColor}
        />
      }
      onPress={() => navigation.navigate("Messages")}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <View style={styles.container}>
        <ListItem
          title="Julian Cordero"
          description="jcordero@gty.org"
          image={require("../../assets/julianProfile.jpg")}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparatorComponent}
          renderItem={renderItem}
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d"></Icon>}
        onPress={() => {
          fetch(
            "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev/signout",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
              method: "POST",
              body: JSON.stringify({
                AccessToken: AccessToken,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.statusCode == 200) {
                navigation.navigate("Home");
              } else {
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      />
    </View>
  );
  // <Icon name="email" size={100} />;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default BibleMoreScreen;
