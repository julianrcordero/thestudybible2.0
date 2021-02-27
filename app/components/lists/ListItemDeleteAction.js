import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeContext";

function ListItemDeleteAction({ onPress }) {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      aspectRatio: 1,
      backgroundColor: colors.primary,
      width: 70,
      // height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.error}
        ></MaterialCommunityIcons>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ListItemDeleteAction;
