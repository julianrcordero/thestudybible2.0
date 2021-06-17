import React, { PureComponent, Component } from "react";
import { Text, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { Paragraph } from "react-native-paper";
import { List, Map } from "immutable";
// import {
//   LazyloadScrollView,
//   LazyloadView,
//   LazyloadImage,
// } from "react-native-lazyload";

// class SectionHeader extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   sectionStyle = {
//     backgroundColor: "red",
//     color: this.props.colors.primary,
//     fontSize: this.props.titleSize,
//   };

//   render() {
//     return (
//       <Text style={[defaultStyles.bibleText, this.sectionStyle]}>
//         {this.props.title}
//       </Text>
//     );
//   }
// }

export default class Chapter extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = { isLoading: true };
  }

  keyExtractor = (item, index) => String(index);

  // componentDidMount() {
  //   console.log("componentDidMount");
  //   this.setState({ isLoading: false });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({ isLoading: false });
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.isLoading !== nextState.isLoading) {
  //     return true;
  //   } else if (this.props.chapterHeading !== nextProps.chapterHeading) {
  //     return true;
  //   } else if (this.props.chapterNum !== nextProps.chapterNum) {
  //     return true;
  //   } else if (this.props.colors !== nextProps.colors) {
  //     return true;
  //   } else if (this.props.verses !== nextProps.verses) {
  //     this.setState({ isLoading: true });
  //     return true;
  //   } else if (this.props.titleSize !== nextProps.titleSize) {
  //     return true;
  //   } else if (this.props.fontSize !== nextProps.fontSize) {
  //     // console.log("fontSize changed");
  //     return true;
  //   }
  //   return false;
  // }

  // mapVerse = (verse, i) => {
  //   let verseText = verse.get("#text");
  //   return List.isList(verseText)
  //     ? verseText.map((phrase) => phrase)
  //     : verseText;
  // };

  mapVerseObject = (verse, i) => (
    <Verse
      key={i}
      onPress={() => this.props.openStudyScreen(this.props.chapterNum, i + 1)}
      verseNumber={i + 1}
      verseText={verse.get("#text")}
      // searchWords={searchWords}
    />
  );

  onLayout = ({ nativeEvent: { layout } }) => {
    let parent = this.props.paragraphBibleRef.current;
    parent._heights[this.props.index] = layout.height;
    parent.setState((state) => ({ timesUpdated: state.timesUpdated + 1 }));
  };

  // renderItem = (item, index) => (
  //   <LazyloadView host="lazyload-list">
  //     <Paragraph
  //       style={[{ fontSize: this.props.fontSize }, this.props.verseTextStyle]}
  //     >
  //       {"TEST PARAGRAPH"}
  //       {/* {item.map(this.mapVerseObject)} */}
  //     </Paragraph>
  //   </LazyloadView>
  // );

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      fontSize,
      style,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    let heading = Map.isMap(chapterHeading)
      ? chapterHeading.get("#text")
      : chapterHeading;

    const title =
      chapterNum + "\t" + (List.isList(heading) ? heading.get(0) : heading);

    const sectionStyle = {
      // backgroundColor: "red",
      color: colors.primary,
      fontSize: titleSize,
    };

    const tenArray = [];

    for (let i = 0; i < Math.ceil(verses / 10); i++) {
      tenArray.push(verse.slice(i * 10, (i + 1) * 10));
    }

    return (
      // style={style}
      // onLayout={this.onLayout}
      <View onLayout={this.onLayout} style={style}>
        {/* <SectionHeader colors={colors} title={title} titleSize={titleSize} /> */}
        <Text style={[defaultStyles.bibleText, sectionStyle]}>{title}</Text>
        {/* <FlatList data={tenArray} renderItem={this.renderItem} /> */}

        {/* <LazyloadScrollView
          // style={styles.container}
          // contentContainerStyle={styles.content}
          name="lazyload-list"
        >
          {tenArray.map(this.renderItem)}
        </LazyloadScrollView> */}
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.map(this.mapVerseObject)}
        </Paragraph>
        {/* <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(0, 10).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(10, 20).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(20, 30).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(30, 40).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(40, 50).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(50, 60).map(this.mapVerseObject)}
        </Paragraph>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.slice(60, verses.size + 1).map(this.mapVerseObject)}
        </Paragraph> */}
      </View>
    );
  }
}
