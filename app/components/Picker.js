import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import { useTheme } from "../config/ThemeProvider";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.medium,
      borderRadius: 25,
      flexDirection: "row",
      padding: 15,
      marginVertical: 10,
    },
    icon: {
      marginRight: 10,
    },
    placeholder: {
      color: colors.medium,
      flex: 1,
    },
    text: {
      flex: 1,
    },
  });

  const renderItem = ({ item }) => (
    <PickerItemComponent
      item={item}
      label={item.label}
      onPress={() => {
        setModalVisible(false);
        onSelectItem(item);
      }}
    />
  );

  const keyExtractor = (item) => item.value.toString();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        {/* <Screen> */}
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          numColumns={numberOfColumns}
          renderItem={renderItem}
        />
        {/* </Screen> */}
      </Modal>
    </>
  );
}

export default AppPicker;
