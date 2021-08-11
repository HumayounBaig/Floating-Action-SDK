import React from "react";
import { FloatingAction } from "react-native-floating-action";

const actions = [
  {
    text: "Text",
    icon: require('../../assets/images/ic_accessibility_white.png'),
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Image",
    icon: require("../../assets/images/ic_language_white.png"),
    name: "bt_language",
    position: 1
  },
  {
    text: "Audio",
    icon: require("../../assets/images/ic_room_white.png"),
    name: "bt_room",
    position: 3
  },
  {
    text: "Video",
    icon: require("../../assets/images/ic_videocam_white.png"),
    name: "bt_videocam",
    position: 4
  }
];

export const FloatingWidget = (params) => (
  <FloatingAction
    actions={actions}
    onPressItem={name => {
      console.log(`selected button: ${name}`);
    }}
  />
)