import React, { Component } from "react";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import {
  ContextProvider,
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

import defaultStyles from "../config/styles";
import Chapter from "./Chapter";

import Constants from "expo-constants";
const { height } = Dimensions.get("window");

const AnimatedRecyclerListView = Animated.createAnimatedComponent(
  RecyclerListView
);

class ContextHelper extends ContextProvider {
  constructor(uniqueKey) {
    super();
    this._contextStore = {};
    this._uniqueKey = uniqueKey;
  }

  getUniqueKey() {
    return this._uniqueKey;
  }

  save(key, value) {
    this._contextStore[key] = value;
  }

  get(key) {
    return this._contextStore[key];
  }

  remove(key) {
    delete this._contextStore[key];
  }
}

export default class RecyclerListBible extends Component {
  constructor(props) {
    super(props);

    this._layoutProvider = new LayoutProvider(
      (index) => {
        return 0;
      },
      (type, dim) => {
        dim.width = 1;
        dim.height = 1300;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    this.state = {
      // contextProvider: new ContextHelper("PARENT"),
      dataProvider: this.provideData.cloneWithRows([
        {
          chapterNum: 1,
          chapterHeading: "chapter heading",
          verses: [
            {
              verseNum: 1,
              verseText: "verse text",
            },
          ],
        },
      ]),
      index: 0,
      sections: [],
      verses: [],
    };
  }

  // let dataProvider = new DataProvider(
  //   (r1, r2) => {
  //     return r1 !== r2;
  //   },
  //   index => {
  //     return data[index].id;
  //   }
  // );

  provideData = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  paragraphBible = this.props.bibleSectionsRef;

  height = height - Constants.statusBarHeight;

  state = {
    loading: false,
  };

  componentDidMount() {
    if (
      this.state.sections.length !==
      this.props.topPanel.current?.state.sections.length
    ) {
      console.log("paragraphBible componentDidMount");
      this.setState({
        sections: this.props.topPanel.current?.state.sections,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.scrollToOffset(this.state.index);
    } else if (prevState.sections !== this.state.sections) {
      //   console.log("heights array:", this._heights.length);
      this.setState({
        // contextProvider: new ContextHelper("PARENT"),
        dataProvider: this.provideData.cloneWithRows(this.state.sections),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    } else if (this.state.sections !== nextState.sections) {
      return true;
    } else if (this.props.colors !== nextProps.colors) {
      return true;
    } else if (this.state.index !== nextState.index) {
      return true;
    } else if (this.state.dataProvider !== nextState.dataProvider) {
      return true;
    }
    return false;
  }

  keyExtractor = (item) => item.chapterNum;

  scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: this.props.scrollY } },
      },
    ],
    { useNativeDriver: true }
  );

  // Gets the comment object and if it is a comment
  // is in the list, then scrolls to it
  scrollToOffset = (index) => {
    const offset = this.getOffsetByIndex(index);
    // console.log("index:", index, "offset:", offset);
    setTimeout(() =>
      this.props.bibleSectionsRef.current?._scrollViewRef.scrollTo({
        x: 0,
        y: offset,
        animated: false,
      })
    );
  };

  onVisibleIndicesChanged = (TOnItemStatusChanged) => {
    this.props.bibleScreen.current.setState({
      currentChapter: TOnItemStatusChanged[0] + 1,
    });
  };

  onRecreate = (OnRecreateParams) => {
    console.log(OnRecreateParams);
  };

  // renderItem = (type, item, index, extendedState) => {
  //   if (type === ViewTypes.HEADER) {
  //     return <Text style={styles.headerStyle}>Header</Text>;
  //   } else {
  //     //let isSelected = (index in extendedState.selected) ? true : false;
  //     return (
  //       <ListItem
  //         item={item}
  //         index={index}
  //         extendedState={extendedState}
  //         onPressItem={this.onPressItem}
  //       />
  //     );
  //   }
  // };

  //Given type and data return the view component
  _rowRenderer(type, item, index, extendedState) {
    return (
      <Chapter
        bibleScreen={this.props.bibleScreen}
        chapterHeading={item.chapterHeading}
        chapterNum={index + 1}
        colors={this.props.colors}
        // extendedState={extendedState}
        // key={i}
        // searchWords={searchWords}
        _heights={this._heights}
        titleSize={this.props.fontSize * 1.75}
        verses={item.verses}
        verseTextStyle={[
          defaultStyles.bibleText,
          {
            color: this.props.colors.text,
            fontSize: this.props.fontSize,
            lineHeight: this.props.fontSize * 2,
            fontFamily: this.props.fontFamily,
          },
        ]}
      />
    );
  }

  getOffsetByIndex = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      const elementHeight = this._heights[i];
      if (elementHeight) {
        offset += this._heights[i];
      }
    }
    return offset;
  };

  //   addToLayoutsMap(height, index) {
  //     this._heights[index] = height;
  //   }

  _heights = [];

  applyWindowCorrection = (offset, windowCorrection) => {
    console.log(offset, windowCorrection);
  };

  onItemLayout = (number) => {
    console.log("onItemLayout", number);
  };

  render() {
    const { bibleSectionsRef, colors, fontSize, HEADER_HEIGHT } = this.props;

    const styles = {
      bibleTextView: {
        // alignItems: "center",
        backgroundColor: colors.background,
        paddingTop: HEADER_HEIGHT,
        flex: 1,
        // paddingHorizontal: width * 0.075,
        // paddingBottom: HEADER_HEIGHT + 500,
      },
    };

    return (
      <AnimatedRecyclerListView
        // applyWindowCorrection={this.applyWindowCorrection}
        bounces={false}
        canChangeSize={true}
        contextProvider={this.state.contextProvider}
        // extendedState={fontSize}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        initialRenderIndex={this.state.index}
        // onRecreate={this.onRecreate}
        onVisibleIndicesChanged={this.onVisibleIndicesChanged}
        rowRenderer={this._rowRenderer}
        forceNonDeterministicRendering={true}
        // onItemLayout={this.onItemLayout}
        onScroll={this.scroll}
        scrollThrottle={16}
        scrollViewProps={{
          ref: bibleSectionsRef,
        }}
        style={styles.bibleTextView}
      />
    );
  }
}
