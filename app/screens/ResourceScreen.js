import React from "react";
import { View, Image as RNImage, ScrollView, StyleSheet } from "react-native";
import { StretchyScrollView } from "react-native-stretchy";
import { Image } from "react-native-expo-image-cache";

import { useTheme } from "../config/ThemeProvider";

import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import AppText from "../components/Text";
import defaultStyles from "../config/styles";

import HTML from "react-native-render-html";

function ResourceScreen({ route }) {
  const { item, date, imageSource } = route.params;
  const fontSize = 18;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    detailsContainer: {
      backgroundColor: colors.background,
      // borderColor: colors.light,
      borderWidth: 0.3,
      paddingHorizontal: 25,
    },
    image: {
      alignSelf: "center",
      // aspectRatio: 1.2,
      backgroundColor: "green",
      width: "60%",
      height: 400,
    },

    date: {
      // backgroundColor: "yellow",
      fontSize: 18,
      fontStyle: "italic",
      textAlign: "right",
      paddingTop: 15,
    },
    header: {
      // alignItems: "flex-start",
      // backgroundColor: "orange",
      // justifyContent: "center",
      // marginVertical: 10,
    },
    scripture: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 18,
    },
    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "bold",
    },
    transcript: {
      // fontSize: 20,
    },
    userContainer: {
      // backgroundColor: colors.background,
      marginVertical: 15,
    },
  });

  return (
    <StretchyScrollView
      backgroundColor={colors.background}
      // contentInsetAdjustmentBehavior={""}
      image={
        imageSource != "" ? imageSource : require("../assets/gtylogo.jpg")
        // item.images
        //   ? { uri: item.images[0].url }
        //   :
      }
      imageHeight={250}
      imageResizeMode={"contain"}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          {item.scripture != "" && (
            <Text style={styles.scripture}>{item.scripture}</Text>
          )}
        </View>

        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/gtylogo.jpg")}
            title={item.author ? item.author : "John MacArthur"}
            subTitle="5 resources"
          />
        </View>
        <HTML
          source={{
            html: item.transcript,
          }}
          baseFontStyle={{ color: colors.text }}
          tagsStyles={
            {
              // strong: { fontSize: 18, lineHeight: 36 },
              // li: { fontSize: 18, lineHeight: 36 },
              // h4: { fontSize: 18, lineHeight: 36 },
              // em: { fontSize: 18, lineHeight: 36 },
              // p: { fontSize: 18, lineHeight: 36 },
            }
          }
          // contentWidth={100}
        />

        <View
          style={{
            height: 70,
          }}
        />
      </View>
    </StretchyScrollView>
  );
}

export default ResourceScreen;
