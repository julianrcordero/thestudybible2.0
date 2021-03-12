import { Platform } from "react-native";

import { useTheme } from "./ThemeProvider";

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
};
