import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { useTheme } from "../config/ThemeProvider";

function AppTextInput({ editable, icon, width = "100%", ...otherProps }) {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      // alignItems: "center",
      backgroundColor: colors.white,
      // borderColor: colors.secondary,
      borderRadius: 5,
      borderWidth: 0.3,
      // flex: 1,
      flexDirection: "row",
      height: 50,
      // width: "100%",
      // padding: 15,
      marginVertical: 10,
    },
    icon: {
      // backgroundColor: "red",
      alignSelf: "center",
      // flex: 1,
      marginHorizontal: 10,
    },
  });

  return (
    <View
      style={[
        styles.container,
        { width, backgroundColor: editable ? colors.white : colors.light },
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.dark}
          style={styles.icon}
        />
      )}
      <TextInput
        // multiline
        editable={editable}
        numberOfLines={4}
        placeholderTextColor={colors.medium}
        style={[defaultStyles.bibleText, { flex: 1 }]}
        {...otherProps}
      />
    </View>
  );
}

export default AppTextInput;
