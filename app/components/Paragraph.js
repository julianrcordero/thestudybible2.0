import React, { PureComponent } from "react";
import { Text } from "react-native";
import Verse from "./Verse";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeContext";

export default class Paragraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  ConditionalWrapper = ({ wrapper, children }) =>
    this.props.formatting == "Default" ? wrapper(children) : children;

  render() {
    const {
      chapterNum,
      colors,
      crossrefSize,
      // focusedVerse,
      fontFamily,
      fontSize,
      section,
      searchWords,
      onPress,
    } = this.props;

    return (
      <this.ConditionalWrapper wrapper={(children) => <Text>{children}</Text>}>
        {section.data.map((data, j) => (
          <Verse
            key={j}
            chapterNum={chapterNum}
            crossrefSize={crossrefSize}
            // focusedVerse={focusedVerse}
            verse={data}
            onPress={() => onPress(chapterNum, j + 1)}
            searchWords={searchWords}
            style={[
              defaultStyles.bibleText,
              {
                color: colors.text,
                fontSize: fontSize,
                lineHeight: fontSize * 2,
                fontFamily: fontFamily,
              },
            ]}
          />
        ))}
      </this.ConditionalWrapper>
    );
  }
}
