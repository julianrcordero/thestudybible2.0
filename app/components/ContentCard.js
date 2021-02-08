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

function ContentCard({ item, onPress }) {
  const firstTwo = item.id.substring(0, 2);
  var imageSource = "";
  var scripture = item.scripture;

  switch (firstTwo) {
    case "ST":
      imageSource = require("../assets/StrengthForToday.jpg");
      scripture = item.scripture;
      break;
    case "DB":
      imageSource = require("../assets/DailyBible.jpg");
      scripture = item.scripture.replaceAll(",", "\n");
      break;
    case "DN":
      imageSource = require("../assets/DrawingNear.jpg");
      scripture = item.scripture;

      break;
    case "DR":
      imageSource = require("../assets/DailyReadings.jpg");
      scripture = item.scripture;
      break;
    default:
      break;
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.contentCard}>
        <View style={styles.imageContainer}>
          <RNImage
            style={styles.image}
            source={imageSource}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.scripture} numberOfLines={4}>
              {scripture}
            </Text>
            <Text style={styles.date}>{item.itemDate}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    // backgroundColor: "orange",
    borderColor: colors.secondary,
    borderWidth: 0.2,
    flexDirection: "row",
    aspectRatio: 1.7,
    height: 200,
    marginHorizontal: 10,
    padding: 10,
    // width: "100%",
  },
  date: {
    // backgroundColor: "green",
    color: colors.secondary,
    fontSize: 12,
    fontStyle: "italic",
  },
  detailsContainer: {
    alignItems: "flex-start",
    backgroundColor: colors.light,
    flex: 2,
    justifyContent: "center",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
  },
  image: {
    // borderWidth: 0.2,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
    // backgroundColor: "green",
    justifyContent: "center",
    paddingRight: 10,
  },
  scripture: {
    color: colors.medium,
    fontSize: 14,
    lineHeight: 25,
    paddingHorizontal: 25,
    // fontWeight: "bold",
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default ContentCard;
