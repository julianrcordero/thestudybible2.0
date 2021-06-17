import React, { PureComponent } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useTheme } from "../config/ThemeProvider";

import AppText from "../components/Text";
import BiblePickerItem from "../components/BiblePickerItem";
import books from "../json/Books";

export default function BooksGridScreen({ route, navigation }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    sectionTitle: {
      color: colors.text,
      fontSize: 20,
    },
    titleCard: {
      alignItems: "flex-end",
      backgroundColor: colors.background,
      height: 55,
      justifyContent: "center",
    },
  });

  const renderItem = ({ item }) => (
    <BiblePickerItem
      backgroundColor={item.backgroundColor}
      label={item.short}
      value={item.value}
      onPress={() =>
        navigation.navigate("Chapters", {
          title: item.label,
          gridChapters: item.chapters,
          value: item.value,
        })
      }
    />
  );

  const keyExtractor = (item) => item.value.toString();

  const columnWrapperStyle = {
    justifyContent: "flex-start",
    width: "14.2857%",
  };

  const booksGridStyle = {
    backgroundColor: colors.background,
    height: "100%",
  };

  return (
    <View style={booksGridStyle}>
      <View style={styles.titleCard}>
        <AppText style={styles.sectionTitle}>Old Testament</AppText>
      </View>
      <FlatList
        data={books.slice(0, 39)}
        keyExtractor={keyExtractor}
        numColumns={7}
        renderItem={renderItem}
        columnWrapperStyle={columnWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.titleCard}>
        <AppText style={styles.sectionTitle}>New Testament</AppText>
      </View>
      <FlatList
        data={books.slice(39, 66)}
        keyExtractor={keyExtractor}
        numColumns={7}
        renderItem={renderItem}
        columnWrapperStyle={columnWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
