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

import { List } from "immutable";
import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

const AnimatedRecyclerListView = Animated.createAnimatedComponent(
  RecyclerListView
);

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
    if (this.state.sections.length === 0) {
      let topPanelSections = this.props.topPanel.current?.state.sections;
      console.log(
        "setting RecyclerListView sections to topPanel sections",
        topPanelSections.length
      );
      this.setState({
        sections: topPanelSections,
      });
    } else {
      console.log("componentDidMount");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.scrollToOffset(this.state.index);
    }
    // else if (prevState.sections !== this.state.sections) {
    //   console.log(
    //     "RecyclerListView sections changed, changing dataProvider now"
    //   );
    //   this.setState({
    //     dataProvider: this.provideData.cloneWithRows(this.state.sections),
    //   });
    // }
    else if (prevState.dataProvider !== this.state.dataProvider) {
      console.log("dataProvider updated");
    } else {
      console.log("something else happened");
      // this.scrollToOffset(1);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fontFamily !== nextProps.fontFamily) {
      return true;
    } else if (this.props.fontSize !== nextProps.fontSize) {
      return true;
    }
    // else if (this.state.sections !== nextState.sections) {
    //   return true;
    // }
    else if (this.props.colors !== nextProps.colors) {
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

  chapterStyle = {
    paddingHorizontal: width * 0.075,
  };

  // //Given type and data return the view component
  // _rowRenderer(type, item, index, extendedState) {
  //   return (
  //     <Chapter
  //       bibleScreen={this.props.bibleScreen}
  //       // chapterHeading={item.heading}
  //       chapterNum={index + 1}
  //       colors={this.props.colors}
  //       // extendedState={extendedState}
  //       fontSize={this.props.fontSize}
  //       // key={i}
  //       // searchWords={searchWords}
  //       _heights={this._heights}
  //       style={this.chapterStyle}
  //       titleSize={this.props.fontSize * 1.75}
  //       verses={item}
  //       verseTextStyle={[
  //         defaultStyles.bibleText,
  //         {
  //           color: this.props.colors.text,
  //           // fontSize: this.props.fontSize,
  //           lineHeight: this.props.fontSize * 2,
  //           fontFamily: this.props.fontFamily,
  //         },
  //       ]}
  //     />
  //   );
  // }

  //Given type and data return the view component
  _rowRenderer(type, item, index, extendedState) {
    return (
      <Chapter
        chapterHeading={item.heading}
        chapterNum={item["@num"] ?? index + 1}
        colors={this.props.colors}
        fontSize={this.props.fontSize}
        index={index}
        // key={i}
        // searchWords={searchWords}
        _heights={this._heights}
        style={this.chapterStyle}
        titleSize={this.props.fontSize * 1.75}
        verses={item.verse}
        verseTextStyle={[
          defaultStyles.bibleText,
          {
            color: this.props.colors.text,
            // fontSize: this.props.fontSize,
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
        // contextProvider={this.state.contextProvider}
        // extendedState={fontSize}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        // initialRenderIndex={1}
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
