import React, { PureComponent } from "react";
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

export default class SettingsScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    fontSize: 16,
    font: "Sans Serif",
    formatting: "Default",
    showCrossReferences: false,
    darkMode: true,
  };

  handleSlide = (value) => {
    this.props.setFontSize(value);
    this.setState({ fontSize: value });
  };

  handleFont = (value) => {
    this.props.setFontFamily(value);
    // this.props.paragraphBibleRef.current.setState({ fontFamily: value });
    this.setState({ font: value });
  };

  handleFormat = (value) => {
    this.props.setFormatting(value);
    this.setState({ formatting: value });
  };

  handleCrossReferences = () => {
    this.setState({ showCrossReferences: !this.state.showCrossReferences });
  };

  handleDarkMode = () => {
    const toggled = !this.state.darkMode;
    this.props.setDarkMode(toggled);
    this.setState({ darkMode: toggled });
  };

  render() {
    const { paragraphBibleRef, top } = this.props;

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
        backgroundColor: colors.light,
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
        backgroundColor: colors.white,
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
          backgroundColor: this.state.darkMode ? colors.medium : colors.light,
          height: top - 50,
          borderTopWidth: 0.3,
          paddingHorizontal: 50,
        }}
      >
        <View style={styles.buttonSection}>
          <Text
            style={{ color: this.state.darkMode ? colors.light : colors.dark }}
          >
            {"Text Size: " + this.state.fontSize + "pt"}
          </Text>
          <Slider
            minimumValue={12}
            maximumValue={24}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.medium}
            onSlidingComplete={this.handleSlide}
            step={2}
            value={this.state.fontSize}
          />
        </View>
        <View style={styles.buttonSection}>
          <Text
            style={[
              styles.title,
              { color: this.state.darkMode ? colors.light : colors.dark },
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
                  this.state.darkMode
                    ? {
                        backgroundColor:
                          this.state.font == font
                            ? colors.primary
                            : colors.secondary,
                      }
                    : {
                        backgroundColor:
                          this.state.font == font
                            ? colors.primary
                            : colors.white,
                      },
                ]}
                onPress={() => this.handleFont(font)}
              >
                <Text
                  style={{
                    color: this.state.darkMode ? colors.light : colors.dark,
                  }}
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
              { color: this.state.darkMode ? colors.light : colors.dark },
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
                  this.state.darkMode
                    ? {
                        backgroundColor:
                          this.state.formatting == format
                            ? colors.primary
                            : colors.secondary,
                      }
                    : {
                        backgroundColor:
                          this.state.formatting == format
                            ? colors.primary
                            : colors.white,
                      },
                ]}
                onPress={() => this.handleFormat(format)}
              >
                <Text
                  style={{
                    color: this.state.darkMode ? colors.light : colors.dark,
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
          <Text
            style={[
              styles.title,
              { color: this.state.darkMode ? colors.light : colors.dark },
            ]}
          >
            {"Show Cross References"}
          </Text>
          <Switch
            trackColor={{ false: colors.medium, true: colors.primary }}
            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={this.handleCrossReferences}
            value={this.state.showCrossReferences}
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
              { color: this.state.darkMode ? colors.light : colors.dark },
            ]}
          >
            {"Dark Mode"}
          </Text>
          <Switch
            trackColor={{ false: colors.medium, true: colors.primary }}
            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={this.handleDarkMode}
            value={this.state.darkMode}
          />
        </View>
      </View>
    );
  }
}
