import React, { PureComponent, useRef, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import reactStringReplace from "react-string-replace";

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
    resourceBox: {
      borderColor: colors.border,
      borderWidth: 0.3,
      marginBottom: 25,
      paddingHorizontal: 20,
      paddingVertical: 15,
      width: "100%",
    },
    search: {
      alignItems: "center",
      aspectRatio: 0.8,
      justifyContent: "center",
    },
    titleText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 18,
    },
  };

  return (
    <View style={myStyles.resourceBox}>
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
            <TouchableOpacity style={myStyles.search} onPress={topRightOnPress}>
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

function ButtonBox({ buttonTitle, onPress }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <AppButton
        title={buttonTitle}
        onPress={onPress} //API CALL
      />
    </View>
  );
}

export default function PanelBox({
  currentNotes,
  fontSize,
  johnsNote,
  notes,
  referenceFilter,
  setCurrentNotes,
  style,
}) {
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
    <View style={[style, defaultStyles.paddingText]}>
      <ResourceBox
        colors={colors}
        title={"My Notes"}
        topRightButton={notes ? "Add a note" : null}
        topRightIcon={"pencil-plus-outline"}
        topRightOnPress={() => noteHistoryRef.current.addANote()}
      >
        {notes ? (
          <NoteHistory
            ref={noteHistoryRef}
            colors={colors}
            currentNotes={currentNotes}
            notes={notes}
            referenceFilter={referenceFilter}
            setCurrentNotes={setCurrentNotes}
            user={user}
          />
        ) : (
          <ButtonBox
            buttonTitle={"Log in to create notes"}
            onPress={() => console.log("Redirecting to login screen")}
          />
        )}
      </ResourceBox>

      <ResourceBox
        title={"John's Note"}
        image={require("../assets/studyBibleAppLogo.jpg")}
      >
        <Text style={myStyles.macArthurText}>
          {user
            ? reactStringReplace(johnsNote, /\n/, (match, i) => (
                <Text key={i}>{"REF"}</Text>
              ))
            : "John's Notes from The Macarthur Study Bible can help you enrich your study of this passage."}
        </Text>
        {user ? null : (
          <ButtonBox
            buttonTitle={"Get John's Notes"}
            onPress={() => console.log("Redirecting to login screen")}
          />
        )}
      </ResourceBox>

      <ResourceBox
        title={"Related Resources"}
        image={require("../assets/gtylogo.jpg")}
      >
        {resourcesLoaded ? (
          <ResourcesScreen />
        ) : (
          <ButtonBox
            buttonTitle={"Load Resources"}
            onPress={() => console.log("Loading Resources")}
          />
        )}
      </ResourceBox>
    </View>
  );
}
