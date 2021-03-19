import React, { PureComponent, useRef, useState } from "react";
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
import AppButton from "./Button";

function ResourceBox({
  children,
  image,
  style,
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
      borderColor: colors.border,
      borderTopWidth: 0.3,
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
      borderColor: colors.border,
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
      <View style={[style, myStyles.header]}>
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

export default function PanelBox({ fontSize, johnsNote }) {
  const { colors } = useTheme();
  const noteHistoryRef = useRef();
  const macarthurText = fontSize * 0.85;
  const macarthurLineHeight = macarthurText * 2;
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

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
    <>
      <ResourceBox
        colors={colors}
        title={"My Notes"}
        topRightButton={"Add a note"}
        topRightIcon={"pencil-plus-outline"}
        topRightOnPress={() => noteHistoryRef.current.addANote()}
      >
        <NoteHistory ref={noteHistoryRef} colors={colors} />
      </ResourceBox>

      <ResourceBox
        title={"John's Note"}
        image={require("../assets/studyBibleAppLogo.jpg")}
        style={{ borderColor: colors.border, borderTopWidth: 0.3 }}
      >
        <Text style={myStyles.macArthurText}>{johnsNote}</Text>
      </ResourceBox>

      <ResourceBox
        title={"Related Resources"}
        image={require("../assets/gtylogo.jpg")}
      >
        <View style={{}}>
          {resourcesLoaded ? (
            <ResourcesScreen />
          ) : (
            <AppButton
              title={"Load resources"}
              onPress={() => console.log("Loading resources")}
            />
          )}
        </View>
      </ResourceBox>
      {/* <View style={{ flex: 1, flexGrow: 1, flexShrink: 1 }}></View> */}
    </>
  );
}
