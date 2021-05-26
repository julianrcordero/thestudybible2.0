import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeProvider";

function NewListingButton({ onPress }) {
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.primary,
      // borderColor: colors.white,
      borderRadius: 40,
      borderWidth: 10,
      bottom: 20,
      height: 80,
      justifyContent: "center",
      width: 80,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.white}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
}

export default NewListingButton;
