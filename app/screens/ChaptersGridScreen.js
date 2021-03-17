import React, { PureComponent } from "react";
import {
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";

import BiblePickerItem from "../components/BiblePickerItem";
import { useTheme } from "../config/ThemeProvider";

export default function ChaptersGridScreen({
  close,
  chapters,
  route,
  changeBibleBook,
}) {
  const { colors, isDark } = useTheme();

  const { gridChapters } = route ? route.params : 0;

  const chapterNum = gridChapters ?? chapters;
  const DATA = [];

  for (let i = 0; i < chapterNum; i++) {
    DATA.push({
      id: i,
      backgroundColor: "#FFFB79",
      title: i + 1,
      short: i + 1,
    });
  }

  const changeBook = (book, chapter) => {
    close();
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        changeBibleBook({
          label: book,
          value: 1,
          backgroundColor: "#345171",
          icon: "apps",
        });
      });
    });
    () => interactionPromise.cancel();

    console.log(book, chapter);
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={7}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => changeBook(route.params.title, item.title)}
          >
            <BiblePickerItem item={item} label={item.short} flex={1 / 7} />
          </TouchableOpacity>
        )}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          width: "14.2857%",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
