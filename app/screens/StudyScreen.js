import React from "react";
import { FlatList } from "react-native";

import { useTheme } from "../config/ThemeContext";
import VerseCard from "../components/VerseCard";

export default function StudyScreen({
  bottomSheetRef,
  carousel,
  currentBook,
  crossrefSize,
  fontSize,
  verseCardReferenceHeight,
  verseList,
  width,
}) {
  const { colors } = useTheme();

  // const componentDidMount() {
  //   console.log("componentDidMount StudyScreen");
  // }

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => item + index;

  const style = {
    backgroundColor: colors.background,
    borderWidth: 0.5,
    // flex: 1,
    paddingHorizontal: 30,
    width: width,
  };

  const renderVerseCardItem = ({ item, index }) => {
    // console.log(item.chapter + " : " + item.title);
    return (
      <VerseCard
        colors={colors}
        key={index}
        carousel={carousel}
        currentBook={currentBook}
        item={item}
        crossrefSize={crossrefSize}
        fontSize={fontSize}
        bottomSheetRef={bottomSheetRef}
        style={style}
        verseCardReferenceHeight={verseCardReferenceHeight}
      />
    );
  };

  return (
    <>
      <FlatList
        bounces={false}
        data={verseList}
        decelerationRate={"fast"}
        // extraData={this.state}
        getItemLayout={getItemLayout}
        horizontal={true}
        initialNumToRender={5}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        onStartShouldSetResponderCapture={() => console.log("Vertical Scroll")}
        ref={carousel}
        removeClippedSubviews
        renderItem={renderVerseCardItem}
        // scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"start"}
        snapToInterval={width}
        // style={{
        //   backgroundColor: colors.white,
        // }}
        updateCellsBatchingPeriod={25}
        windowSize={11}
      />

      {/* NOT SURE WHY */}
      {/* <View
          style={{
            // backgroundColor: colors.light,
            height: 500,
            position: "relative",
          }}
        ></View> */}
    </>
  );
}

// import React from "react";
// import { FlatList, View } from "react-native";

// import VerseCard from "../components/VerseCard";
// // import { PureComponent } from "react";
// import { Component } from "react";

// export default class StudyScreen extends Component {
//   constructor(props) {
//     super(props);
//   }
//   // const { colors, isDark } = useTheme();

//   componentDidMount() {
//     console.log("componentDidMount StudyScreen");
//   }

//   getItemLayout = (data, index) => ({
//     length: this.props.width,
//     offset: this.props.width * index,
//     index,
//   });

//   keyExtractor = (item, index) => item + index;

//   style = {
//     // backgroundColor: colors.background,
//     borderWidth: 0.5,
//     // flex: 1,
//     paddingHorizontal: 30,
//     width: this.props.width,
//   };

//   renderVerseCardItem = ({ item, index }) => {
//     console.log(item.chapter + " : " + item.title);
//     return (
//       <VerseCard
//         colors={this.props.colors}
//         key={index}
//         carousel={this.props.carousel}
//         currentBook={this.props.currentBook}
//         item={item}
//         crossrefSize={this.props.crossrefSize}
//         fontSize={this.props.fontSize}
//         bottomSheetRef={this.props.bottomSheetRef}
//         style={this.style}
//         verseCardReferenceHeight={this.props.verseCardReferenceHeight}
//       />
//     );
//   };

//   render() {
//     const { carousel, verseList, width } = this.props;

//     console.log("render() StudyScreen");

//     return (
//       <>
//         <FlatList
//           bounces={false}
//           data={verseList}
//           decelerationRate={"fast"}
//           extraData={this.state}
//           getItemLayout={this.getItemLayout}
//           horizontal={true}
//           initialNumToRender={5}
//           keyExtractor={this.keyExtractor}
//           maxToRenderPerBatch={5}
//           onStartShouldSetResponderCapture={() =>
//             console.log("Vertical Scroll")
//           }
//           ref={carousel}
//           removeClippedSubviews
//           renderItem={this.renderVerseCardItem}
//           // scrollEventThrottle={16}
//           showsHorizontalScrollIndicator={false}
//           snapToAlignment={"start"}
//           snapToInterval={width}
//           // style={{
//           //   backgroundColor: colors.white,
//           // }}
//           updateCellsBatchingPeriod={25}
//           windowSize={11}
//         />

//         {/* NOT SURE WHY */}
//         {/* <View
//           style={{
//             // backgroundColor: colors.light,
//             height: 500,
//             position: "relative",
//           }}
//         ></View> */}
//       </>
//     );
//   }
// }
