import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import { useTheme } from "../../config/ThemeContext";

function ListItem({
  height = 70,
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  titleSize = 14,
}) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      // borderColor: colors.secondary,
      borderRadius: 10,
      borderBottomWidth: 0.3,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      backgroundColor: colors.white,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 20,
      justifyContent: "center",
    },
    image: {
      width: 50,
      // borderColor: colors.secondary,
      borderRadius: 35,
      borderWidth: 0.3,
    },
    subTitle: {
      color: colors.text,
      fontSize: 12,
    },
    title: {
      color: "cornflowerblue",
      fontWeight: "bold",
    },
  });

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity underlayColor={colors.light} onPress={onPress}>
        <View
          style={[styles.container, { height, borderColor: colors.secondary }]}
        >
          {IconComponent}
          {image && (
            <Image
              style={[styles.image, { borderColor: colors.secondary }]}
              source={image}
              resizeMode="contain"
            />
          )}
          <View style={styles.detailsContainer}>
            <Text
              style={[styles.title, { fontSize: titleSize }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={"cornflowerblue"}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default ListItem;
