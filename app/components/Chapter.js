import React, { PureComponent } from "react";
import { Text } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { Paragraph } from "react-native-paper";
import { Map } from "immutable";

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
  }

  keyExtractor = (item, index) => item.chapterNum.concat(index);

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.chapterHeading !== nextProps.chapterHeading) {
  //     return true;
  //   } else if (this.props.chapterNum !== nextProps.chapterNum) {
  //     return true;
  //   } else if (this.props.colors !== nextProps.colors) {
  //     return true;
  //   } else if (this.props.verses !== nextProps.verses) {
  //     return true;
  //   } else if (this.props.titleSize !== nextProps.titleSize) {
  //     return true;
  //   } else if (this.props.fontSize !== nextProps.fontSize) {
  //     // console.log("fontSize changed");
  //     return true;
  //   }
  //   return false;
  // }

  mapVerse = (verse, i) => {
    let verseText = verse.get("#text");
    return Array.isArray(verseText)
      ? verseText.map((phrase) => phrase)
      : verseText;
  };

  // mapVerseObject = (verse, i) => (
  //   <Verse
  //     key={i}
  //     onPress={() => this.props.openStudyScreen(this.props.chapterNum, i + 1)}
  //     verseNumber={i + 1}
  //     verseText={verse.get("#text")}
  //     // searchWords={searchWords}
  //   />
  // );

  // onLayout = ({ nativeEvent: { layout } }) => {
  //   this.props._heights[this.props.index] = layout.height;
  //   // console.log("onLayout");
  // };

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      fontSize,
      // style,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Map.isMap(chapterHeading) ? chapterHeading.get(0) : chapterHeading);

    const sectionStyle = {
      backgroundColor: "red",
      color: colors.primary,
      fontSize: titleSize,
    };

    return (
      // style={style}
      // onLayout={this.onLayout}
      <>
        {/* <SectionHeader colors={colors} title={title} titleSize={titleSize} /> */}
        <Text style={[defaultStyles.bibleText, sectionStyle]}>{title}</Text>
        <Paragraph style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.map(this.mapVerse)}
        </Paragraph>
      </>
      // <FlatList
      //   // contentContainerStyle={{ flexDirection: "column" }}
      //   horizontal
      //   data={verses}
      //   // numColumns={3}
      //   renderItem={this.mapVerse}
      //   style={{ width: "100%" }}
      // />
    );
  }
}
