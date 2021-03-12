import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "../components/Text";

import ListItem from "../components/lists/BibleListItem";
import { useTheme } from "../config/ThemeProvider";

function BibleResourceScreen(props) {
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    description: {
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 20,
    },
    detailsContainer: {
      padding: 20,
    },
    image: {
      width: "100%",
      height: 300,
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
    },
    userContainer: {
      marginVertical: 40,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={require("../assets/gtylogo.jpg")} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Matthew Study Guide</AppText>
        <AppText style={styles.description}>
          Study the Bible in-depth with John's handy guide.
        </AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/macarthurProfile.jpg")}
            title="John MacArthur"
            description="500 Resources"
          />
        </View>
      </View>
    </View>
  );
}

export default BibleResourceScreen;
