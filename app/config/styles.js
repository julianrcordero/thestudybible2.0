import { Platform } from "react-native";
import { Dimensions } from "react-native";

export default {
  bibleText: {
    color: "darkslategrey", //colors.medium, //cau
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    // lineHeight: 32,
    // textAlign: "justify",
  },
  macArthurText: {
    color: "darkslategrey",
    // fontSize: 13,
    fontFamily: Platform.OS === "android" ? "normal" : "Georgia-Italic",
  },
  paddingText: {
    paddingHorizontal: Dimensions.get("window").width * 0.075,
  },
  headerPaddingHorizontal: {
    paddingHorizontal: Dimensions.get("window").width * 0.03,
  },
};
