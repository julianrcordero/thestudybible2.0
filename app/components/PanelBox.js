import React, { PureComponent } from "react";
import {
  Image,
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
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
            justifyContent: "space-between",
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
          {this.props.topRightButton ? (
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Button
                title={this.props.topRightButton}
                onPress={this.props.topRightOnPress}
              />
              <TouchableOpacity
                style={styles.search}
                onPress={this.props.topRightOnPress}
              >
                <MaterialCommunityIcons
                  name={this.props.topRightIcon}
                  color={colors.black}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {this.props.children}
      </View>
    );
  }
}

export default class PanelBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    noteHistory: [
      {
        id: 2,
        title: "Today at 11:23am",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: 1,
        title: "December 22, 2020 at 5:00pm",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
      },
      {
        id: 0,
        title: "July 8, 2020 at 10:00am",
        description:
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
      },
    ],
  };

  renderResourceGroup = ({ item, index, separators }) => {
    return (
      <ResourceBox title={item.title} image={item.image}>
        {item.child}
      </ResourceBox>
    );
  };

  addANote = () => {
    const newNoteHistory = [
      {
        id: this.state.noteHistory.length,
        title: "Today at 3:15pm",
        description: "",
        open: true,
      },
      ...this.state.noteHistory,
    ];
    this.setState({ noteHistory: newNoteHistory });
    this.props.carousel.current.setNativeProps({ scrollEnabled: false });
  };

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.state.noteHistory.filter((m) => m.id !== item.id);

    this.setState({
      noteHistory: newList,
    });
  };

  render() {
    const {
      carousel,
      fontSize,
      johnsNote,
      // paragraphBibleRef,
      bottomSheetRef,
    } = this.props;

    const macarthurText = fontSize * 0.85;
    const macarthurLineHeight = macarthurText * 2;

    return (
      <View>
        <ResourceBox
          title={"My Notes"}
          topRightButton={"Add a note"}
          topRightIcon={"pencil-plus-outline"}
          topRightOnPress={this.addANote}
        >
          <NoteHistory
            carousel={carousel}
            noteHistory={this.state.noteHistory}
            handleDelete={this.handleDelete}
          />
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
