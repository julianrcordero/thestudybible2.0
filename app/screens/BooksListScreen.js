import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import AppText from "../components/Text";
import BiblePickerItem from "../components/BiblePickerItem";
import ChaptersGridScreen from "./ChaptersGridScreen";
import { AccordionList } from "accordion-collapse-react-native";
import { useTheme } from "../config/ThemeProvider";
import books from "../json/Books";

const { width } = Dimensions.get("window");

export default function BooksListScreen({
  navigation,
  route,
  bibleScreen,
  paragraphBibleRef,
  topPanel,
}) {
  const { colors, isDark } = useTheme();
  const [rightOpen, setRightOpen] = useState(false);
  const headerHeight = 55;
  const myWidth = width - 30;
  const buttonWidth = (myWidth - 15) / 2;

  const _renderLeftHeader = (section) => {
    return (
      <View style={styles.leftHeader}>
        {rightOpen ? (
          <></>
        ) : (
          <BiblePickerItem
            backgroundColor={section.backgroundColor}
            label={section.label}
            aspectRatio={5}
            width={buttonWidth}
            textColor={colors.text}
          />
        )}
      </View>
    );
  };

  const _renderRightHeader = (section) => {
    return (
      <View style={styles.rightHeader}>
        <BiblePickerItem
          backgroundColor={section.backgroundColor}
          label={section.label}
          aspectRatio={5}
          width={buttonWidth}
          textColor={colors.text}
        />
      </View>
    );
  };

  const _renderContent = (section) => {
    return (
      <ChaptersGridScreen
        chapters={section.chapters}
        bibleScreen={bibleScreen}
        paragraphBibleRef={paragraphBibleRef}
        route={route}
        topPanel={topPanel}
        value={section.value}
        width={myWidth}
      />
    );
  };

  const styles = StyleSheet.create({
    background: { backgroundColor: colors.background, height: "100%" },
    body: {
      flexDirection: "row",
      paddingBottom: headerHeight,
      justifyContent: "space-between",
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 20,
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      height: headerHeight,
    },
    column1: {
      flexGrow: 1,
    },
    column2: {
      flexGrow: 1,
    },
    leftHeader: {
      marginVertical: 3,
    },
    rightHeader: {
      marginVertical: 3,
      alignItems: "flex-end",
    },
  });

  // const openChapters = (title, gridChapters) => {
  //   console.log("openChapters:", title, gridChapters);
  //   navigation.setParams({
  //     title: title,
  //     gridChapters: gridChapters,
  //   });
  // };

  const onToggleLeft = (item, index, isExpanded) =>
    // openChapters(books[index].label, books[index].chapters);
    navigation.setParams({
      title: books[index].label,
      gridChapters: books[index].chapters,
    });

  const onToggleRight = (item, index, isExpanded) => {
    // openChapters(books[index + 39].label, books[index + 39].chapters);
    navigation.setParams({
      title: books[index + 39].label,
      gridChapters: books[index + 39].chapters,
    });
    setRightOpen(isExpanded);
  };

  const keyExtractor = (item) => `${item.value}`;

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <AppText style={[styles.sectionTitle]}>Old Testament</AppText>
        <AppText style={[styles.sectionTitle]}>New Testament</AppText>
      </View>
      <View style={styles.body}>
        <View style={styles.column1}>
          <AccordionList
            list={books.slice(0, 39)}
            header={_renderLeftHeader}
            body={_renderContent}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            onToggle={onToggleLeft}
          />
        </View>
        <View style={styles.column2}>
          <AccordionList
            list={books.slice(39, 66)}
            header={_renderRightHeader}
            body={_renderContent}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            onToggle={onToggleRight}
          />
        </View>
      </View>
    </View>
  );
}
