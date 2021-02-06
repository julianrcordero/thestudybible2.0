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

  state = { fontSize: 16 };

  handleSlide = (value) => {
    // console.log(this.props.paragraphBibleRef.current.state);
    this.props.paragraphBibleRef.current.setState({ fontSize: value });
    this.setState({ fontSize: value });
  };

  render() {
    const { paragraphBibleRef, top } = this.props;

    return (
      <View
        style={{
          backgroundColor: colors.light,
          height: top - 50,
          borderTopWidth: 0.2,
          paddingHorizontal: 50,
        }}
      >
        <View style={styles.settings}>
          <Text>{"Text Size: " + this.state.fontSize + "pt"}</Text>
          <Slider
            minimumValue={12}
            maximumValue={24}
            minimumTrackTintColor={colors.medium}
            maximumTrackTintColor={colors.primary}
            onSlidingComplete={this.handleSlide}
            step={2}
            value={this.state.fontSize}
          />
        </View>
        <View style={styles.settings}>
          <Text style={styles.title}>{"Font"}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Text style={styles.button}>Sans Serif</Text>
            <Text style={styles.button}>Serif</Text>
            <Text style={styles.button}>Slab Serif</Text>
          </View>
        </View>
        <View style={styles.settings}>
          <Text style={styles.title}>{"Formatting"}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Text style={styles.button}>Default</Text>
            <Text style={styles.button}>Study</Text>
            <Text style={styles.button}>Reader</Text>
          </View>
        </View>
        <View
          style={[
            styles.settings,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.title}>{"Show Cross References"}</Text>
          <Switch
            trackColor={{ false: colors.medium, true: colors.primary }}
            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            // onValueChange={toggleSwitch}
            // value={isEnabled}
          />
        </View>
        <View
          style={[
            styles.settings,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.title}>{"Dark Mode"}</Text>
          <Switch
            trackColor={{ false: colors.medium, true: colors.primary }}
            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            // onValueChange={toggleSwitch}
            // value={isEnabled}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderColor: colors.medium,
    borderTopWidth: 0.2,
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
  settings: {
    marginTop: 25,
    width: "100%",
  },
  title: {
    marginVertical: 6,
  },
};
