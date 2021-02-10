import React from "react";
import {
  Button,
  View,
  Image as RNImage,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import AppButton from "./Button";
import AppText from "./Text";

function ContentCard({ item, onPress }) {
  const firstTwo = item.id.substring(0, 2);
  var imageSource = "";
  var scripture = item.scripture;
  var transcript = item.transcript;

  switch (firstTwo) {
    case "ST":
      imageSource = require("../assets/StrengthForToday.jpg");
      scripture = item.scripture;
      transcript = item.transcript.substring(
        0,
        item.transcript.indexOf("</p>")
      );
      break;
    case "DB":
      imageSource = require("../assets/DailyBible.jpg");
      scripture = ""; //item.scripture.replaceAll(",", "\n");
      transcript = item.transcript.substring(
        0,
        item.transcript.indexOf("</ul>")
      );
      break;
    case "DN":
      imageSource = require("../assets/DrawingNear.jpg");
      scripture = item.scripture;
      transcript = item.transcript.substring(
        0,
        item.transcript.indexOf("</p>")
      );
      break;
    case "DR":
      imageSource = require("../assets/DailyReadings.jpg");
      scripture = item.scripture;
      transcript = item.transcript.substring(
        0,
        item.transcript.indexOf("</p>")
      );
      break;
    default:
      transcript = item.transcript.substring(
        0,
        item.transcript.indexOf("</p>")
      );
      break;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.contentCard}>
        <View style={styles.imageContainer}>
          {imageSource ? (
            <RNImage
              style={styles.image}
              source={imageSource}
              resizeMode="contain"
            />
          ) : (
            <RNImage
              style={styles.image}
              source={require("../assets/gtylogo.jpg")}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>
            {scripture != "" && (
              <Text style={styles.scripture} numberOfLines={4}>
                {scripture}
              </Text>
            )}
            {item.itemDate && <Text style={styles.date}>{item.itemDate}</Text>}
          </View>
          <View
            style={{
              // backgroundColor: "green",
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <HTML
              source={{
                html: transcript,
              }}
              tagsStyles={{
                strong: { fontSize: 12, lineHeight: 20 },
                li: { fontSize: 10, lineHeight: 15 },
                h4: { fontSize: 11, lineHeight: 20 },
                em: { fontSize: 11 },
                p: { fontSize: 12, lineHeight: 20 },
              }}
              // contentWidth={100}
            />
          </View>
          <AppText
            style={{
              color: "cornflowerblue",
              fontWeight: "bold",
              marginVertical: 5,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {"READ"}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    borderColor: colors.secondary,
    borderWidth: 0.2,
    flexDirection: "row",
    aspectRatio: 1.7,
    height: 200,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    // width: "100%",
  },
  date: {
    color: colors.secondary,
    fontSize: 12,
    fontStyle: "italic",
  },
  detailsContainer: {
    // backgroundColor: colors.light,
    flex: 2,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
  },
  scripture: {
    color: colors.medium,
    fontSize: 12,
    lineHeight: 22,
  },
  title: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default ContentCard;
