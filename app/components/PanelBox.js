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
import useAuth from "../auth/useAuth";

function ResourceBox({
  children,
  image,
  title,
  topRightButton,
  topRightIcon,
  topRightOnPress,
}) {
  const { colors } = useTheme();

  const myStyles = {
    button: { alignItems: "center", flexDirection: "row" },
    header: {
      alignItems: "center",
      // backgroundColor: "yellow",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    image: {
      aspectRatio: 1,
      marginRight: 5,
      width: 30,
    },
    panelBox: {
      borderColor: colors.border,
      borderWidth: 0.3,
      marginVertical: 12.5,
      paddingHorizontal: 20,
      paddingVertical: 15,
      width: "100%",
    },
    titleText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 16,
    },
  };

  return (
    <View style={myStyles.panelBox}>
      <View style={myStyles.header}>
        {image ? <Image style={myStyles.image} source={image}></Image> : null}
        <AppText style={myStyles.titleText}>{title}</AppText>
        {topRightButton ? (
          <View style={myStyles.button}>
            <Button
              title={topRightButton}
              onPress={topRightOnPress}
              style={{ fontSize: 12 }}
            />
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

export default function PanelBox({ fontSize, notes, johnsNote }) {
  const { user, logOut } = useAuth();
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
        paddingVertical: macarthurText,
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
        <NoteHistory ref={noteHistoryRef} colors={colors} notes={notes} />
      </ResourceBox>

      <ResourceBox
        title={"John's Note"}
        image={require("../assets/studyBibleAppLogo.jpg")}
      >
        <Text style={myStyles.macArthurText}>
          {user
            ? johnsNote
            : "John's Notes from The Macarthur Study Bible can help you enrich your study of this passage."}
        </Text>
        {user ? null : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <AppButton
              title={"Get John's Notes"}
              onPress={() => console.log("Get John's Notes")} //API CALL
            />
          </View>
        )}
      </ResourceBox>

      <ResourceBox
        title={"Related Resources"}
        image={require("../assets/gtylogo.jpg")}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
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
    </>
  );
}
