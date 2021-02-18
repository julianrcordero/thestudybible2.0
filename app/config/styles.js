import { Platform } from "react-native";

import { useTheme } from "./ThemeContext";

export default {
  bibleText: {
    // color: colors.medium, //cau
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    // lineHeight: 32,
    // textAlign: "justify",
  },
  macArthurText: {
    // color: colors.medium,
    // fontSize: 13,
    fontFamily: Platform.OS === "android" ? "normal" : "Georgia-Italic",
  },
};
