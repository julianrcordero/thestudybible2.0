import React, { PureComponent } from "react";
import {
  FlatList,
  InteractionManager,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
  Text,
} from "react-native";

import colors from "../config/colors";
import AppText from "../components/Text";
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
    darkMode: false,
  };

  handleSlide = (value) => {
    this.props.setFontSize(value);
    this.setState({ fontSize: value });
  };

  handleFont = (value) => {
    this.props.paragraphBibleRef.current.setState({ fontFamily: value });
    this.setState({ font: value });
  };

  handleFormat = (index) => {
    this.setState({ formatting: index });
  };

  handleCrossReferences = () => {
    this.setState({ showCrossReferences: !this.state.showCrossReferences });
  };

  handleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
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

    return (
      <View
        style={{
          backgroundColor: colors.light,
          height: top - 50,
          borderTopWidth: 0.3,
          paddingHorizontal: 50,
        }}
      >
        <View style={styles.buttonSection}>
          <Text>{"Text Size: " + this.state.fontSize + "pt"}</Text>
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
          <Text style={styles.title}>{"Font"}</Text>
          <View style={styles.buttons}>
            {fonts.map((font, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      this.state.font == font ? colors.primary : colors.white,
                  },
                ]}
                onPress={() => this.handleFont(font)}
              >
                <Text>{font}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.buttonSection}>
          <Text style={styles.title}>{"Formatting"}</Text>
          <View style={styles.buttons}>
            {formats.map((format, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      this.state.formatting == format
                        ? colors.primary
                        : colors.white,
                  },
                ]}
                onPress={() => this.handleFormat(format)}
              >
                <Text>{format}</Text>
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
          <Text style={styles.title}>{"Show Cross References"}</Text>
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
          <Text style={styles.title}>{"Dark Mode"}</Text>
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

const styles = {
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
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
    borderColor: colors.medium,
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
