import React from "react";
import { View, Image as RNImage, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import AppText from "../components/Text";

import HTML from "react-native-render-html";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  const fontSize = 16;

  return (
    <View style={{ backgroundColor: colors.white }}>
      {listing.images ? (
        <Image
          style={styles.image}
          preview={{ uri: listing.images[0].thumbnailUrl }}
          tint="light"
          uri={listing.images[0].url}
        />
      ) : (
        <RNImage
          style={styles.image}
          source={require("../assets/gtylogo.jpg")}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.scripture}>{listing.scripture}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/gtylogo.jpg")}
              title={listing.author ? listing.author : "John MacArthur"}
              subTitle="5 Listings"
            />
          </View>
          <HTML source={{ html: listing.transcript }} contentWidth={"100%"} />
          {/* <AppText
            style={{
              fontSize: fontSize,
              lineHeight: fontSize * 2,
              marginVertical: 15,
            }}
          >
            {listing.transcript}
          </AppText> */}
          <View
            style={{
              height: 800,
            }}
          ></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.light,
    padding: 30,
  },
  image: {
    alignSelf: "center",
    aspectRatio: 1.2,
    backgroundColor: "green",
    width: "60%",
    height: undefined,
  },
  scripture: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    backgroundColor: colors.white,
    // marginVertical: 40,
  },
});

export default ListingDetailsScreen;
