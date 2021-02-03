import React, { PureComponent } from "react";
import { Image, FlatList, View, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import AppText from "../components/Text";
import defaultStyles from "../config/styles";
import NoteHistory from "./NoteHistory";
import ResourcesScreen from "../screens/ResourcesScreen";

class ResourceBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          // backgroundColor: "pink",
          borderColor: colors.medium,
          borderWidth: 0.2,
          marginVertical: 10,
          padding: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            // backgroundColor: "orange",
            flexDirection: "row",
            height: 40,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 5,
            // marginBottom: 5,
          }}
        >
          {this.props.image ? (
            <Image
              style={{
                aspectRatio: 1,
                backgroundColor: "red",
                marginRight: 5,
                width: 30,
              }}
              source={this.props.image}
            ></Image>
          ) : null}
          <AppText style={[styles.titleText, defaultStyles.bibleText]}>
            {this.props.title}
          </AppText>
        </View>
        {this.props.children}
      </View>
    );
  }
}

export default class PanelBox extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   backgroundColor: "white",
    //   textDecorationLine: "none",
    // };
  }

  renderResourceGroup = ({ item, index, separators }) => {
    return (
      <ResourceBox title={item.title} image={item.image}>
        {item.child}
      </ResourceBox>
    );
  };

  render() {
    const {
      fontSize,
      johnsNote,
      // paragraphBibleRef,
      bottomSheetRef,
    } = this.props;

    const macarthurText = fontSize * 0.85;
    const macarthurLineHeight = macarthurText * 2;

    // const data = [
    //   {
    //     id: "0",
    //     title: "My Notes",
    //     image: require("../assets/studyBibleAppLogo.jpg"),
    //     child: <NoteHistory />,
    //   },
    //   {
    //     id: "1",
    //     title: "John's Notes",
    //     image: require("../assets/studyBibleAppLogo.jpg"),
    //     child: (
    //       <Text
    //         style={[
    //           defaultStyles.macArthurText,
    //           { fontSize: macarthurText, lineHeight: macarthurLineHeight },
    //         ]}
    //       >
    //         {johnsNote}
    //       </Text>
    //     ),
    //   },
    //   {
    //     id: "2",
    //     title: "Related Resources",
    //     image: require("../assets/gtylogo.jpg"),
    //     child: <ResourcesScreen />,
    //   },
    // ];

    // return (
    //   <FlatList
    //     data={data}
    //     // extraData={this.props}
    //     renderItem={this.renderResourceGroup}
    //     keyExtractor={(item) => item.id}
    //     // ListEmptyComponent={() => this.listEmptyComponent()}
    //   />
    // );

    return (
      <View
        style={
          {
            // backgroundColor: "orange",
          }
        }
      >
        <ResourceBox
          title={"My Notes"}
          // image={require("../assets/studyBibleAppLogo.jpg")}
        >
          <NoteHistory />
        </ResourceBox>

        <ResourceBox
          title={"John's Note"}
          image={require("../assets/studyBibleAppLogo.jpg")}
        >
          <Text
            style={[
              defaultStyles.macArthurText,
              { fontSize: macarthurText, lineHeight: macarthurLineHeight },
            ]}
          >
            {johnsNote}
          </Text>
        </ResourceBox>

        <ResourceBox
          title={"Related Resources"}
          image={require("../assets/gtylogo.jpg")}
        >
          <ResourcesScreen />
        </ResourceBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  macArthurBox: {
    height: "100%",
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },

  relatedResourcesBox: {
    borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    // paddingHorizontal: 10,
  },

  verseLink: {
    color: "#00aeef",
  },
});
