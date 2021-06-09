import React, { PureComponent, Component } from "react";
import { Text, View } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { TouchableHighlight } from "react-native";
// import { Paragraph, Text } from "react-native-paper";

class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  sectionStyle = {
    backgroundColor: "red",
    color: this.props.colors.primary,
    fontSize: this.props.titleSize,
  };

  render() {
    return (
      <Text style={[defaultStyles.bibleText, this.sectionStyle]}>
        {this.props.title}
      </Text>
    );
  }
}

export default class Chapter extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = () => {
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.verse !== this.props.verse) {
  //   }
  // };

  keyExtractor = (item, index) => index.toString();

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chapterHeading !== nextProps.chapterHeading) {
      return true;
    } else if (this.props.chapterNum !== nextProps.chapterNum) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.props.verses !== nextProps.verses) {
      return true;
    } else if (this.props.titleSize !== nextProps.titleSize) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      // console.log("fontSize changed");
      return true;
    }
    return false;
  }

  mapVerse = (verse, i) =>
    i + 1 + " " + Array.isArray(verse["#text"])
      ? verse["#text"].map((text) => {
          return text;
        })
      : verse["#text"];

  mapVerseObject = (verse, i) => (
    <Verse
      chapterNum={this.props.chapterNum}
      key={i}
      _openStudyScreen={this._openStudyScreen}
      verseNumber={i + 1}
      verseText={verse["#text"]}
      verseTextStyle={this.props.verseTextStyle}
      // searchWords={searchWords}
    />
  );

  _openStudyScreen = (verseNumber) => {
    this.props.bibleScreen.current?.toggleSlideView(
      this.props.chapterNum,
      verseNumber
    );
  };

  onLayout = ({ nativeEvent: { layout } }) => {
    this.props._heights[this.props.index] = layout.height;
    // console.log("onLayout");
  };

  render() {
    const {
      chapterHeading,
      chapterNum,
      colors,
      fontSize,
      // onHideUnderlay,
      // onShowUnderlay,
      style,
      titleSize,
      verses,
      verseTextStyle,
    } = this.props;

    const title =
      chapterNum +
      "\t" +
      (Array.isArray(chapterHeading) ? chapterHeading[0] : chapterHeading);

    return (
      <View
        style={style}
        // onLayout={this.onLayout}
      >
        <SectionHeader colors={colors} title={title} titleSize={titleSize} />
        <Text style={[{ fontSize: fontSize }, verseTextStyle]}>
          {verses.map(this.mapVerseObject)}
          {/* {
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
          } */}
        </Text>
      </View>
      // verses.length > 0 ? (
      //   <Text
      //     style={[{ fontSize: fontSize }, style, verseTextStyle]}
      //     onLayout={this.onLayout}
      //   >
      //     {verses.map(this.mapVerseObject)}
      //   </Text>
      // ) : (
      //   <Text style={{ height: 0 }}>{"No verses"}</Text>
      // )
    );
  }
}
