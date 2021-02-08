import React, { useState, useEffect, PureComponent } from "react";
import {
  ActivityIndicator as Indicator,
  Button,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
// import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ContentCard from "../components/ContentCard";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";

class MarkupItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderWidth: 0.2,
          borderColor: colors.secondary,
          flex: 1 / 2,
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <MaterialCommunityIcons
          style={{}}
          name={this.props.icon}
          color={colors.black}
          size={38}
        />
        {/* <View style={{ backgroundColor: "red", height: 30 }}>
          <Button title={this.props.title}></Button>
        </View> */}
        <AppText
          style={{
            color: "cornflowerblue",
            fontWeight: "bold",
            marginVertical: 15,
            fontSize: 14,
          }}
        >
          {this.props.title}
        </AppText>
      </TouchableOpacity>
    );
  }
}

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const { user } = useAuth();
  useEffect(() => {
    getListingsApi.request();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var today = new Date(),
    date = monthNames[today.getMonth()] + " " + today.getDate();

  return (
    <Screen style={styles.screen}>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <ActivityIndicator visible={getListingsApi.loading} />
        {getListingsApi.loading ? (
          <Indicator animating={getListingsApi.loading} size={"large"} />
        ) : (
          <AppText style={{ fontSize: 24, margin: 10 }}>
            {"Good Morning"}
            {user ? ", " + user.name.substr(0, user.name.indexOf(" ")) : null}
            {"."}
          </AppText>
        )}

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText
            style={{ fontWeight: "bold", fontSize: 16, paddingVertical: 15 }}
          >
            DEVOTIONALS
          </AppText>
          <AppText style={{ fontSize: 18, fontStyle: "italic" }}>
            {date}
          </AppText>
        </View>
        <FlatList
          data={getListingsApi.data}
          horizontal
          getItemLayout={(data, index) => ({
            length: 500,
            offset: 500 * index,
            index,
          })}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <ContentCard
              item={item}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
          style={{ flexGrow: 0 }}
        />
        {/* 
      <FlatList
        data={getListingsApi.data}
        // getItemLayout={(data, index) => ({ length: 200 })}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            scripture={item.scripture}
            // imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            itemDate={item.itemDate}
            category={item.category}
            // thumbnailUrl={item.imageUrl}
          />
        )}
      /> */}
        <View
          style={{
            alignSelf: "center",
            aspectRatio: 1.1,
            // borderWidth: 1,
            marginVertical: 15,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <MarkupItem icon={"bookmark-outline"} title={"BOOKMARKS"} />
            <MarkupItem icon={"pencil-box-outline"} title={"NOTES"} />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <MarkupItem icon={"heart-outline"} title={"FAVORITES"} />
            <MarkupItem icon={"format-color-highlight"} title={"HIGHLIGHTS"} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
});

export default ListingsScreen;
