import React from "react";
import {
  View,
  Image as RNImage,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { TouchableHighlight } from "react-native-gesture-handler";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.card}>
        {thumbnailUrl ? (
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        ) : (
          <RNImage
            style={styles.image}
            source={require("../assets/gtylogo.jpg")}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginVertical: 10,
    overflow: "hidden",
  },
  detailsContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  image: {
    alignSelf: "center",
    aspectRatio: 1.2,
    backgroundColor: "green",
    width: "60%",
    height: undefined,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
