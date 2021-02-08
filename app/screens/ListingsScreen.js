import React, { useState, useEffect } from "react";
import {
  ActivityIndicator as Indicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ContentCard from "../components/ContentCard";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
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
        <AppText style={{ fontSize: 24, margin: 15 }}>Good Morning.</AppText>
      )}

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
        }}
      >
        <AppText
          style={{ fontWeight: "bold", fontSize: 16, paddingVertical: 10 }}
        >
          DEVOTIONALS
        </AppText>
        <AppText style={{ fontStyle: "italic" }}>February 14</AppText>
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
            title={item.title}
            scripture={item.scripture}
            // imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            itemDate={item.itemDate}
            category={item.category}
            // thumbnailUrl={item.imageUrl}
          />
        )}
      />

      {/* <FlatList
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: colors.white,
  },
});

export default ListingsScreen;
