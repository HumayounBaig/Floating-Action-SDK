import React, { useState } from "react";
import { FloatingWidget } from "./FloatingWidget"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { floatingActions } from "./floatingActions";
import { Text } from "react-native";

const handleItemSelection = (type) => {
  switch (type) {
    case 'bt_image':
      _onOpenActionSheet()
      
      break;
  
    default:
      break;
  }
}

const FloatingWidgetContainer = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [cameraResponse, setCameraResponse] = useState(null);

  _onOpenActionSheet = () => {
    const options = ['Open Camera', 'Chose From Library', 'Cancel'];
    const destructiveButtonIndex = -1;
    const cancelButtonIndex = 2;
  
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          try {
            launchCamera({}, setCameraResponse)
          } catch (error) {
            console.log(error)            
          }
        } else {
          try {
            launchImageLibrary({}, setCameraResponse)
          } catch (error) {
            console.log(error)            
          }
        }
      },
    );
  };
  return (
    <FloatingWidget 
      actions = {floatingActions}
      handleItemSelection = {handleItemSelection}
    />
  )
}

export const FloatingWidgetConnected = FloatingWidgetContainer