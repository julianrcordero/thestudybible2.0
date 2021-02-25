import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BibleCard from "../components/BibleCard";
import { useTheme } from "../config/ThemeContext";

const listings = [
  {
    id: 1,
    title: "Matthew Study Guide",
    description:
      "Study the gospel of Matthew in-depth with John's handy guide.",
    image: require("../assets/gtylogo.jpg"),
  },
  {
    id: 2,
    title: "Luke Study Guide",
    description: "Study the gospel of Luke in-depth with John's handy guide.",
    image: require("../assets/gtylogo.jpg"),
  },
];

function BibleListingsScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.light,
      flex: 1,
      padding: 20,
    },
  });

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <BibleCard
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => navigation.navigate("BibleResource")}
          />
        )}
      />
    </View>
  );
}

export default BibleListingsScreen;
