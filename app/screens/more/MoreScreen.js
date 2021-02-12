import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ListItem from "../../components/lists/ListItem";
import ListItemSeparator from "../../components/lists/ListItemSeparator";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import useAuth from "../../auth/useAuth";

function MoreScreen({ navigation }) {
  //navigation}){
  const { user, logOut } = useAuth();

  //   <ListItem
  //   title={user.name}
  //   subTitle={user.email}
  //   image={require("../../assets/gtylogo.jpg")}
  // />

  const menuItems = [
    {
      title: user ? user.name : "LOG IN / REGISTER",
      subTitle: user ? user.email : null,
      icon: {
        name: user ? null : "account-circle-outline",
      },
      image: user ? require("../../assets/gtylogo.jpg") : null,
      targetScreen: routes.ACCOUNT,
      titleSize: user ? 16 : null,
    },
    {
      title: "NOTIFICATIONS",
      icon: {
        name: "bell-outline",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "ABOUT",
      icon: {
        name: "information-outline",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "APP TOUR",
      icon: {
        name: "map-outline",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "FEEDBACK",
      icon: {
        name: "message-processing-outline",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "GIVE",
      icon: {
        name: "gift-outline",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "RATE THIS APP",
      icon: {
        name: "star-half-full",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTING_DETAILS,
    },
    {
      title: "SHARE",
      icon: {
        name: "export-variant",
        backgroundColor: colors.secondary,
      },
      targetScreen: routes.MESSAGES,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              height={60}
              title={item.title}
              subTitle={item.subTitle}
              image={item.image}
              IconComponent={
                item.icon.name ? (
                  <Icon
                    name={item.icon.name}
                    backgroundColor={colors.white} //item.icon.backgroundColor}
                    iconColor={colors.medium}
                  />
                ) : null
              }
              titleSize={item.titleSize ?? null}
              onPress={() => {
                // console.log(item);
                navigation.navigate(item.targetScreen);
              }}
            />
          )}
        />
      </View>
      {/* <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },

  container: {
    // marginVertical: 25,
  },
});

export default MoreScreen;