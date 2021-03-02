// import React, { useState } from "react";
// import { Button, TouchableOpacity, View } from "react-native";
// import { useTheme } from "../config/ThemeContext";

// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export default function StudyToolBar() {
//   // this.state = {
//   //   backgroundColor: "white",
//   //   textDecorationLine: "none",
//   //   bookmarked: false,
//   //   loved: false,
//   // };
//   const { colors } = useTheme();
//   const [backgroundColor, setBackgroundColor] = useState("white");
//   const [textDecorationLine, setTextDecorationLine] = useState("none");
//   const [bookmarked, setBookmarked] = useState(false);
//   const [loved, setLoved] = useState(false);

//   const _toggleBookmarked = () => {
//     setBookmarked(!bookmarked);
//     // this.state.bookmarked === true
//     //   ? this.setState({ bookmarked: false })
//     //   : this.setState({ bookmarked: true });
//   };

//   const _toggleLoved = () => {
//     setLoved(!loved);
//     // this.state.loved === true
//     //   ? this.setState({ loved: false })
//     //   : this.setState({ loved: true });
//   };

//   return (
//     <View
//       style={{
//         alignItems: "flex-start",
//         backgroundColor: colors.background,
//         flex: 0.75,
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//       }}
//     >
//       <TouchableOpacity>
//         <MaterialCommunityIcons name="marker" color={colors.icon} size={22} />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={_toggleBookmarked}>
//         <MaterialCommunityIcons
//           name={bookmarked ? "bookmark" : "bookmark-outline"}
//           color={colors.icon} //this.state.bookmarked ? "red" : "black"}
//           size={22}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={_toggleLoved}>
//         {
//           <MaterialCommunityIcons
//             name={loved ? "heart" : "heart-outline"}
//             color={colors.icon} //this.state.loved ? "red" : "black"}
//             size={22}
//           />
//         }
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <MaterialCommunityIcons
//           name="file-multiple"
//           color={colors.icon}
//           size={22}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <MaterialCommunityIcons
//           name="file-upload-outline"
//           color={colors.icon}
//           size={22}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }
import React, { PureComponent } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { useTheme } from "../config/ThemeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class StudyToolBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "white",
      textDecorationLine: "none",
      bookmarked: false,
      loved: false,
    };
  }

  _toggleBookmarked = () => {
    this.state.bookmarked === true
      ? this.setState({ bookmarked: false })
      : this.setState({ bookmarked: true });
  };

  _toggleLoved = () => {
    this.state.loved === true
      ? this.setState({ loved: false })
      : this.setState({ loved: true });
  };

  render() {
    const { colors } = this.props;

    return (
      <View
        style={{
          alignItems: "flex-start",
          flex: 0.75,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons name="marker" color={colors.icon} size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._toggleBookmarked}>
          <MaterialCommunityIcons
            name={this.state.bookmarked ? "bookmark" : "bookmark-outline"}
            color={colors.icon} //this.state.bookmarked ? "red" : "black"}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._toggleLoved}>
          {
            <MaterialCommunityIcons
              name={this.state.loved ? "heart" : "heart-outline"}
              color={colors.icon} //this.state.loved ? "red" : "black"}
              size={22}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-multiple"
            color={colors.icon}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-upload-outline"
            color={colors.icon}
            size={22}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
