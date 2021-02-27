import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";

function MenuButton({ title, icon, onPress, darkMode }) {
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      // backgroundColor: colors.secondary,
      // borderColor: colors.medium,
      // borderWidth: 0.3,
      flex: 1,
      // height: 70,
      justifyContent: "center",
      // paddingBottom: 10,
      // paddingTop: 12,
    },
    image: {
      paddingBottom: 5,
    },
    text: {
      fontSize: 10,
      textTransform: "uppercase",
      fontWeight: "normal",
      paddingTop: 5,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: darkMode ? colors.medium : colors.light },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={colors.icon}
        style={styles.image}
      ></MaterialCommunityIcons>
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
      {/* <Image resizeMode="contain" style={styles.image} source={icon}></Image>
       */}
    </TouchableOpacity>

    /* <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.white}
        ></MaterialCommunityIcons>
      </View>
    </TouchableWithoutFeedback> */
  );
}

export default MenuButton;
