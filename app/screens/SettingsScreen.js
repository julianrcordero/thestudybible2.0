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

export const SettingsScreen = ({
  fontFamily,
  fontSize,
  formatting,
  setFontFamily,
  setFontSize,
  setFormatting,
  // paragraphBibleRef,
  top,
}) => {
  const { setScheme, isDark, colors } = useTheme();

  const [showCrossReferences, setShowCrossReferences] = useState(false);

  const handleSlide = (value) => {
    setFontSize(value);
  };

  const handleFont = (value) => {
    setFontFamily(value);
  };

  const handleFormat = (value) => {
    setFormatting(value);
  };

  const handleCrossReferences = () => {
    setShowCrossReferences(!showCrossReferences);
  };

  const handleDarkMode = () => {
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
        backgroundColor: colors.background,
        height: top - 50,
        borderTopWidth: 0.3,
        paddingHorizontal: 50,
      }}
    >
      <View style={styles.buttonSection}>
        <Text style={{ color: colors.text }}>
          {"Text Size: " + fontSize + "pt"}
        </Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.secondary}
          onSlidingComplete={handleSlide}
          step={2}
          value={fontSize}
        />
      </View>
      <View style={styles.buttonSection}>
        <Text style={[styles.title, { color: colors.text }]}>{"Font"}</Text>
        <View style={styles.buttons}>
          {fonts.map((font, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {
                  backgroundColor:
                    font == fontFamily ? colors.primary : colors.background,
                },
              ]}
              onPress={() => handleFont(font)}
            >
              <Text
                style={{
                  color: colors.text,
                }}
              >
                {font}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Text style={[styles.title, { color: colors.text }]}>
          {"Formatting"}
        </Text>
        <View style={styles.buttons}>
          {formats.map((format, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {
                  backgroundColor:
                    formatting == format ? colors.primary : colors.background,
                },
              ]}
              onPress={() => handleFormat(format)}
            >
              <Text
                style={{
                  color: colors.text,
                }}
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
        <Text style={[styles.title, { color: colors.text }]}>
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
        <Text style={[styles.title, { color: colors.text }]}>
          {"Dark Mode"}
        </Text>
        <Switch
          trackColor={{ false: colors.secondary, true: colors.primary }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={handleDarkMode}
          value={isDark}
        />
      </View>
    </View>
  );
};
