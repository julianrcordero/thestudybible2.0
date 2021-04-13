import React, { PureComponent } from "react";
import { FlatList, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useTheme } from "../config/ThemeProvider";

import defaultStyles from "../config/styles";
import Paragraph from "./Paragraph";
import AppText from "./Text";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // const { colors, isDark } = useTheme();
    return (
      <Text
        style={[
          defaultStyles.bibleText,
          {
            color: this.props.colors.primary,
            fontSize: this.props.titleSize,
            // borderBottomColor: "#345171",
          },
        ]}
      >
        {this.props.title}
      </Text>
    );
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedSectionHeader = Animated.createAnimatedComponent(SectionHeader);

export default class ParagraphBible extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    sections: null,
  };
  // chapterNum: Number(chapter["_num"]),
  // title: Array.isArray(chapter["heading"])
  //   ? chapter["heading"][0]
  //   : chapter["heading"],
  // data: chapter["verse"],

  renderParagraphItem = ({ item, i }) => (
    <React.Fragment key={i}>
      <AnimatedSectionHeader
        colors={this.props.colors}
        title={
          Array.isArray(item["heading"]) ? item["heading"][0] : item["heading"]
          // item.title
        }
        titleSize={this.props.fontSize * 1.5}
      />
      {/* <AppText>{item.chapterNum}</AppText> */}
      <Paragraph
        chapterNum={Number(item["_num"])} //item.chapterNum}
        colors={this.props.colors}
        fontFamily={this.props.fontFamily}
        fontSize={this.props.fontSize}
        formatting={this.props.formatting}
        key={i}
        section={item["verse"]}
        // searchWords={searchWords}
        onPress={this.props.toggleSlideView}
      />
    </React.Fragment>
  );

  keyExtractor = (item) => item["_num"];

  // getItemLayout = (data, index) => ({
  //   length: this.props.width,
  //   offset: this.props.width * index,
  //   index,
  // });

  render() {
    const { colors, HEADER_HEIGHT, scrollY } = this.props;

    const styles = {
      bibleTextView: {
        backgroundColor: colors.background,
        paddingHorizontal: 25,
      },
    };

    return (
      <AnimatedFlatList
        bounces={false}
        data={this.state.sections}
        // extra={this.props.fontSize}
        initialNumToRender={1}
        keyExtractor={this.keyExtractor}
        maxToRenderPerBatch={3}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        removeClippedSubviews
        renderItem={this.renderParagraphItem}
        // scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[
          styles.bibleTextView,
          {
            paddingTop: HEADER_HEIGHT,
            paddingBottom: HEADER_HEIGHT + 300,
          },
        ]}
        updateCellsBatchingPeriod={150}
        windowSize={3}

        // initialNumToRender={5}
        // keyExtractor={this.keyExtractor}
        // maxToRenderPerBatch={3}
        // onViewableItemsChanged={this.onViewRef}
        // ref={carousel}
        // removeClippedSubviews
        // renderItem={this.renderVerseCardItem}
        // // scrollEventThrottle={16}
        // showsHorizontalScrollIndicator={false}
        // snapToAlignment={"center"}
        // snapToInterval={width}
        // updateCellsBatchingPeriod={25}
        // viewabilityConfig={this.viewConfigRef}
        // windowSize={11}
      />
    );
  }
}
