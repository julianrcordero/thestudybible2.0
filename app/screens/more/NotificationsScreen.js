import React, { useState } from "react";
import { StyleSheet, View, Switch } from "react-native";

import { useTheme } from "../../config/ThemeContext";

import AppText from "../../components/Text";
import defaultStyles from "../../config/styles";

export default function NotificationsScreen({}) {
  const [generalUpdates, setGeneralUpdates] = useState(false);
  const [resourceUpdates, setResourceUpdates] = useState(false);
  const [devotionalAlarm, setDevotionalAlarm] = useState(false);

  return (
    <View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={[defaultStyles.bibleText, styles.title]}>
            {"General Updates"}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Keep up to date on important app-related information."}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          onValueChange={() => setGeneralUpdates(!generalUpdates)}
          value={generalUpdates}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={styles.title}>{"Resource Offers"}</AppText>
          <AppText style={styles.subTitle}>
            {"Keep up to date on resource offers from Grace To You"}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          onValueChange={() => setResourceUpdates(!resourceUpdates)}
          value={resourceUpdates}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
      <View style={styles.settings}>
        <View style={{ flex: 1 }}>
          <AppText style={[defaultStyles.bibleText, styles.title]}>
            {"Devotional Alarm"}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Receive daily reminders to read your devotionals"}
          </AppText>
        </View>
        <Switch
          trackColor={{ false: colors.medium, true: colors.primary }}
          onValueChange={() => setDevotionalAlarm(!devotionalAlarm)}
          value={devotionalAlarm}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    // backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 15,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 6,
  },
  subTitle: {
    fontSize: 14,
    width: "70%",
  },
});
