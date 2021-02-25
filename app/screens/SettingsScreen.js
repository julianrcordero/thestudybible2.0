import React, { PureComponent, useState } from "react";
import {
  FlatList,
  InteractionManager,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

import { useTheme } from "../config/ThemeContext";

import Text from "../components/Text";
import BiblePickerItem from "../components/BiblePickerItem";

import Slider from "@react-native-community/slider";

export default function SettingsScreen({
  // setFontSize,
  // setFontFamily,
  // setFormatting,
  // paragraphBibleRef,
  top,
}) {
  // constructor(props) {
  //   super(props);
  // }

  // state = {
  //   fontSize: 16,
  //   font: "Sans Serif",
  //   formatting: "Default",
  //   showCrossReferences: false,
  //   darkMode: false,
  // };
  const { setScheme, isDark } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [font, setFont] = useState("Sans Serif");
  const [formatting, setFormatting] = useState("Default");
  const [showCrossReferences, setShowCrossReferences] = useState(false);

  const handleSlide = (value) => {
    setFontSize(value);
    // setState({ fontSize: value });
  };

  const handleFont = (value) => {
    setFont(value);
    // paragraphBibleRef.current.setState({ fontFamily: value });
    // setState({ font: value });
  };

  const handleFormat = (value) => {
    setFormatting(value);
    // setState({ formatting: value });
  };

  const handleCrossReferences = () => {
    setShowCrossReferences(!showCrossReferences);
    // setState({ showCrossReferences: !showCrossReferences });
  };

  const handleDarkMode = () => {
    // const toggled = !darkMode;
    // setDarkMode(toggled);
    // setState({ darkMode: toggled });

    isDark ? setScheme("light") : setScheme("dark");
  };

  const fonts = ["Avenir", "Avenir Next Condensed", "Avenir-Oblique"]; //["Sans Serif", "Serif", "Slab Serif"];
  const formats = ["Default", "Study", "Reader"];

  const button = (text) => (
    <TouchableOpacity style={styles.button}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );

  const styles = {
    buttons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
    },
    header: {
      alignItems: "center",
      // backgroundColor: colors.light,
      // borderColor: colors.medium,
      borderTopWidth: 0.3,
      flexDirection: "row",
      height: 50,
      justifyContent: "space-between",
      paddingHorizontal: 15,
      width: "100%",
    },
    button: {
      alignItems: "center",
      // backgroundColor: colors.white,
      borderWidth: 0.5,
      // borderColor: colors.medium,
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 6,
      paddingVertical: 6,
      textAlign: "center",
    },
    buttonSection: {
      marginTop: 25,
      width: "100%",
    },
    title: {
      marginVertical: 6,
    },
  };

  return (
    <View
      style={{
        // backgroundColor: darkMode ? colors.medium : colors.light,
        height: top - 50,
        borderTopWidth: 0.3,
        paddingHorizontal: 50,
      }}
    >
      <View style={styles.buttonSection}>
        <Text
        // style={{ color: darkMode ? colors.light : colors.dark }}
        >
          {"Text Size: " + fontSize + "pt"}
        </Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          // minimumTrackTintColor={colors.primary}
          // maximumTrackTintColor={colors.medium}
          onSlidingComplete={handleSlide}
          step={2}
          value={fontSize}
        />
      </View>
      <View style={styles.buttonSection}>
        <Text
          style={[
            styles.title,
            // { color: darkMode ? colors.light : colors.dark },
          ]}
        >
          {"Font"}
        </Text>
        <View style={styles.buttons}>
          {fonts.map((font, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                // darkMode
                //   ? {
                //       backgroundColor:
                //         font == font
                //           ? colors.primary
                //           : colors.secondary,
                //     }
                //   : {
                //       backgroundColor:
                //         font == font
                //           ? colors.primary
                //           : colors.white,
                //     },
              ]}
              onPress={() => handleFont(font)}
            >
              <Text
                style={
                  {
                    // color: darkMode ? colors.light : colors.dark,
                  }
                }
              >
                {font}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Text
          style={[
            styles.title,
            // { color: darkMode ? colors.light : colors.dark },
          ]}
        >
          {"Formatting"}
        </Text>
        <View style={styles.buttons}>
          {formats.map((format, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                // darkMode
                //   ? {
                //       backgroundColor:
                //         formatting == format
                //           ? colors.primary
                //           : colors.secondary,
                //     }
                //   : {
                //       backgroundColor:
                //         formatting == format
                //           ? colors.primary
                //           : colors.white,
                //     },
              ]}
              onPress={() => handleFormat(format)}
            >
              <Text
                style={
                  {
                    // color: darkMode ? colors.light : colors.dark,
                  }
                }
              >
                {format}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.buttonSection,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text
          style={[
            styles.title,
            // { color: darkMode ? colors.light : colors.dark },
          ]}
        >
          {"Show Cross References"}
        </Text>
        <Switch
          // trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={handleCrossReferences}
          value={showCrossReferences}
        />
      </View>
      <View
        style={[
          styles.buttonSection,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text
          style={[
            styles.title,
            // { color: darkMode ? colors.light : colors.dark },
          ]}
        >
          {"Dark Mode"}
        </Text>
        <Switch
          // trackColor={{ false: colors.medium, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={handleDarkMode}
          value={isDark}
        />
      </View>
    </View>
  );
}
