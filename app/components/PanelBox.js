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
import { useTheme } from "../config/ThemeProvider";

import AppText from "../components/Text";
import defaultStyles from "../config/styles";
import NoteHistory from "./NoteHistory";
import ResourcesScreen from "../screens/ResourcesScreen";

function ResourceBox({
  children,
  image,
  text,
  title,
  topRightButton,
  topRightIcon,
  topRightOnPress,
}) {
  const { colors } = useTheme();

  const myStyles = {
    button: { alignItems: "center", flexDirection: "row" },
    header: {
      flexDirection: "row",
      height: 50,
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      aspectRatio: 1,
      marginRight: 5,
      width: 30,
    },
    panelBox: {
      borderBottomWidth: 0.2,
      paddingHorizontal: 30,
      width: "100%",
    },
    titleText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 16,
      // paddingHorizontal: 10,
    },
  };

  return (
    <View style={myStyles.panelBox}>
      <View style={myStyles.header}>
        {image ? <Image style={myStyles.image} source={image}></Image> : null}
        <AppText style={myStyles.titleText}>{title}</AppText>
        {topRightButton ? (
          <View style={myStyles.button}>
            <Button title={topRightButton} onPress={topRightOnPress} />
            <TouchableOpacity style={styles.search} onPress={topRightOnPress}>
              <MaterialCommunityIcons
                name={topRightIcon}
                color={colors.icon}
                size={22}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {children}
    </View>
  );
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
  };

  handleDelete = (item) => {
    //Delete the message from messages
    const newList = this.state.noteHistory.filter((m) => m.id !== item.id);

    this.setState({
      noteHistory: newList,
    });
  };

  render() {
    const { colors, fontSize, johnsNote } = this.props;

    const macarthurText = fontSize * 0.85;
    const macarthurLineHeight = macarthurText * 2;

    const myStyles = {
      macArthurText: [
        defaultStyles.macArthurText,
        {
          color: colors.text,
          fontSize: macarthurText,
          lineHeight: macarthurLineHeight,
          paddingBottom: macarthurLineHeight,
        },
      ],
    };

    return (
      <View>
        <ResourceBox
          colors={colors}
          title={"My Notes"}
          topRightButton={"Add a note"}
          topRightIcon={"pencil-plus-outline"}
          topRightOnPress={this.addANote}
        >
          <NoteHistory
            noteHistory={this.state.noteHistory}
            handleDelete={this.handleDelete}
          />
        </ResourceBox>

        <ResourceBox
          title={"John's Note"}
          image={require("../assets/studyBibleAppLogo.jpg")}
        >
          <Text style={myStyles.macArthurText}>{johnsNote}</Text>
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
    // borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },

  relatedResourcesBox: {
    // borderColor: colors.medium,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
});
