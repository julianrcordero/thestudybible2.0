import React from "react";
import {
  View,
  Image as RNImage,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import { useTheme } from "../config/ThemeContext";

import { TouchableHighlight } from "react-native-gesture-handler";

function Card({
  category,
  title,
  scripture,
  imageUrl,
  itemDate,
  onPress,
  thumbnailUrl,
}) {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderWidth: 0.3,
      borderRadius: 10,
      backgroundColor: colors.white,
      marginVertical: 10,
      overflow: "hidden",
    },
    date: {
      backgroundColor: "green",
      color: colors.secondary,
      fontSize: 12,
      fontStyle: "italic",
    },
    detailsContainer: {
      backgroundColor: colors.primary,
      paddingHorizontal: 15,
      paddingVertical: 10,
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
      // fontWeight: "bold",
    },
    title: {
      color: colors.secondary,
      flex: 1,
      fontSize: 18,
      fontWeight: "bold",
      paddingBottom: 5,
      // marginBottom: 7,
    },
  });

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
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.scripture} numberOfLines={2}>
              {scripture}
            </Text>
            <Text style={styles.date}>{itemDate}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default Card;
