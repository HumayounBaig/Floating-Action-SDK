import React, { useState, useEffect } from "react";
import { FloatingWidget } from "./FloatingWidget"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { floatingActions } from "./floatingActions";
import { Text, View, Modal, Pressable } from "react-native";
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import { AudioRecorder } from "./AudioRecorder";
import { TextArea } from "./TextArea";

const FloatingWidgetContainer = () => {
  const { showActionSheetWithOptions } = useActionSheet(); 
  const [audioRecording, setAudioRecording] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);

  const _handleAudioRecord = () => {
    setModalVisible(!modalVisible)
  }

  const _handleText = () => {
    setTextModalVisible(!textModalVisible)
  }
  
  const handleItemSelection = (type) => {
    switch (type) {
      case 'bt_image':
        _onOpenActionSheet()
        break;
      case 'bt_audio':
        _handleAudioRecord()
        break;
      case 'bt_text':
        _handleText()
        break;
    
      default:
        break;
    }
  }

  const postImageFeedback = async(cameraResponse) => {
    try {
      const data = new FormData(); 
      data.append("feedback_file", {
        uri: `file://${cameraResponse.uri}`,
        name: cameraResponse.fileName,
        type: cameraResponse.type,
      });
      data.append("user", "admin"); 
      data.append("domain", "salik");
      let res = await fetch("https://ajmanplugin-api.lfdanalytics.com/api/create_feedback/",
      { method: "POST", headers:
        { Pragma: "no-cache", "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate", },
        body: data,
      })
      console.log('res', await res.json())
      // .then((res) => res.json())
      // .then((result) => {
      //   console.log('result', result)
      //   const { data } = result;
      //   if (Object.keys(data).length > 0) {
      //     feedbackResContainer.style.display = "block";
      //     txtFeedbackContainer.style.display = "none";
      //     audioOptionContainer.style.display = "none";
      //     videoOptionContainer.style.display = "none";
      //     if (submitType === "textfile") {
      //       textArea.value = "";
      //     }
      //   }
      // })
    } catch (error) {
      console.log(error)
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
            launchCamera({}, (res) => postImageFeedback(res.assets[0]))
          } catch (error) {
            console.log(error)            
          }
        } else if (buttonIndex === 1){
          try {
            launchImageLibrary({}, (res) => postImageFeedback(res.assets[0]))
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
      <Modal
        animationType="slide"
        visible={textModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setTextModalVisible(!textModalVisible);
        }}
        presentationStyle="pageSheet"
      > 
        <TextArea />
      </Modal>
    </>
  )
}

export const FloatingWidgetConnected = FloatingWidgetContainer