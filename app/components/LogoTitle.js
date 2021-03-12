import React, { Image, PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./Text";
import { useTheme } from "../config/ThemeProvider";

// export default class LogoTitle extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   render() {

//     return (
//       <View style={{ alignItems: "center", flexDirection: "row", margin: 20 }}>
//         <Image
//           style={{
//             aspectRatio: 1,
//             width: 30,
//             marginRight: 15,
//           }}
//           source={require("../assets/StudyBibleApp_Logo_black.png")}
//         ></Image>

//         <AppText style={{ fontSize: 18, fontWeight: "bold" }}>
//           {"The Study Bible"}
//         </AppText>
//       </View>
//     );
//   }
// }

export default function LogoTitle() {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", margin: 20 }}>
      <Image
        style={{
          aspectRatio: 1,
          width: 30,
          marginRight: 15,
        }}
        source={require("../assets/StudyBibleApp_Logo_black.png")}
      ></Image>

      <AppText style={{ fontSize: 18, fontWeight: "bold" }}>
        {"The Study Bible"}
      </AppText>
    </View>
  );
}
