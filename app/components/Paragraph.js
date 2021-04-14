import React, { PureComponent } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";
import AppText from "./Text";

export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  ConditionalWrapper = ({ wrapper, children }) =>
    this.props.formatting == "Default" ? wrapper(children) : children;

  keyExtractor = (item, index) => item + index;

  renderVerseItem = ({ item, i }) => (
    <Verse
      key={i}
      verse={item}
      // onPress={() => onPress(chapterNum, j + 1)}
      // searchWords={searchWords}
    />
  );

  render() {
    const {
      chapterNum,
      colors,
      fontFamily,
      fontSize,
      section,
      searchWords,
      onPress,
    } = this.props;

    return (
      <this.ConditionalWrapper
        wrapper={(children) => (
          <Text
            style={[
              defaultStyles.bibleText,
              {
                color: colors.text,
                fontSize: fontSize,
                lineHeight: fontSize * 2,
                fontFamily: fontFamily,
              },
            ]}
          >
            {children}
          </Text>
        )}
      >
        {
          // <FlatList
          //   bounces={false}
          //   contentContainerStyle={{ flexDirection: "row" }}
          //   data={section}
          //   decelerationRate={"fast"}
          //   horizontal={true}
          //   initialNumToRender={5}
          //   keyExtractor={this.keyExtractor}
          //   maxToRenderPerBatch={7}
          //   removeClippedSubviews
          //   renderItem={this.renderVerseItem}
          //   updateCellsBatchingPeriod={25}
          //   windowSize={11}
          // />

          section.map((data, j) => (
            <Verse
              key={j}
              // chapterNum={chapterNum}
              verse={data}
              onPress={() => onPress(chapterNum, j + 1)}
              // searchWords={searchWords}
            />
          ))
        }
      </this.ConditionalWrapper>
    );
  }
}
