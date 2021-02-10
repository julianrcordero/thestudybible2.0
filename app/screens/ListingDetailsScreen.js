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
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            marginVertical: 15,
          }}
        >
          <Text style={styles.title}>{listing.title}</Text>
          {listing.scripture != "" && (
            <Text style={styles.scripture}>{listing.scripture}</Text>
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/gtylogo.jpg")}
              title={listing.author ? listing.author : "John MacArthur"}
              subTitle="5 Listings"
            />
          </View>
          <Text style={styles.transcript}>
            {/* <HTML source={{ html: listing.transcript }} /> */}
            <HTML
              source={{
                html: listing.transcript,
              }}
              tagsStyles={{
                strong: { fontSize: 16, lineHeight: 36 },
                li: { fontSize: 16, lineHeight: 36 },
                h4: { fontSize: 16, lineHeight: 36 },
                em: { fontSize: 16, lineHeight: 36 },
                p: { fontSize: 16, lineHeight: 36 },
              }}
              // contentWidth={100}
            />
          </Text>
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
    paddingHorizontal: 25,
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
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
  transcript: {
    fontSize: 20,
  },
  userContainer: {
    backgroundColor: colors.white,
    marginBottom: 15,
  },
});

export default ListingDetailsScreen;
