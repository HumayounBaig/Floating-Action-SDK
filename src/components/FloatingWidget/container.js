import React, { useState, useEffect } from "react";
import { FloatingWidget } from "./FloatingWidget"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { floatingActions } from "./floatingActions";
import { Text, View, Modal, Pressable } from "react-native";
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import { AudioRecorder } from "./AudioRecorder";

const FloatingWidgetContainer = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [cameraResponse, setCameraResponse] = useState(null);
  const [audioRecording, setAudioRecording] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const _handleAudioRecord = () => {
    setModalVisible(!modalVisible)
  }
  
  const handleItemSelection = (type) => {
    switch (type) {
      case 'bt_image':
        _onOpenActionSheet()
        break;
      case 'bt_audio':
        _handleAudioRecord()
        break;
    
      default:
        break;
    }
  }
  
  const _onOpenActionSheet = () => {
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
        } else if (buttonIndex === 1){
          try {
            launchImageLibrary({}, setCameraResponse)
          } catch (error) {
            console.log(error)            
          }
        }
      },
    );
  };

  useEffect(() => {
    console.log('audio', audioRecording)
  }, [audioRecording]);

  return (
    <>
      <FloatingWidget 
        actions = {floatingActions}
        handleItemSelection = {handleItemSelection}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        presentationStyle="pageSheet"
      > 
        <AudioRecorder />
      </Modal>
    </>
  )
}

export const FloatingWidgetConnected = FloatingWidgetContainer