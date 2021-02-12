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
import colors from "../../config/colors";

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
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, { height }]}>
          {IconComponent}
          {image && (
            <Image style={styles.image} source={image} resizeMode="contain" />
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: colors.secondary,
    borderRadius: 10,
    borderBottomWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    // backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  image: {
    width: 50,
    borderColor: colors.secondary,
    borderRadius: 35,
    borderWidth: 0.3,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  title: {
    color: "cornflowerblue",
    fontWeight: "bold",
  },
});

export default ListItem;
