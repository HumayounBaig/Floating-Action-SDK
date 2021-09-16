import React, { useState } from 'react';
import Textarea from 'react-native-textarea';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import RNFS from 'react-native-fs';

export const TextArea = (params) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = async() => {
    console.log('feedbackText', feedbackText)
    let path = RNFS.DocumentDirectoryPath + '/test.txt';
    console.log(RNFS.DocumentDirectoryPath + '/test.txt')

    RNFS.writeFile(path, feedbackText, 'utf8')
    .then(async(success) => {
      console.log('FILE WRITTEN!');
      console.log('success', success)
      RNFS.readFile(path, 'utf8')
      .then(file => console.log(file))

      // let result = await fetch(path);
      // console.log(await result.blob());
      // const fileData = await result.blob()
      const data = new FormData(); 
      data.append("feedback_file", {
        uri: `file://${path}`,
        name: "image",
        type: "image/png",
      });
      data.append("user", "admin"); 
      data.append("domain", "text_athar");
  
      console.log(data)

      let res = await fetch("https://ajmanplugin-api.lfdanalytics.com/api/create_feedback/",
      { method: "POST", headers:
        { Pragma: "no-cache", "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate", },
        body: data,
      })
      console.log('res', await res.json())


    })
    .catch((err) => {
      console.log(err.message);
    });


  }
  return (
    <View style={styles.container}>
      <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={setFeedbackText}
        defaultValue={feedbackText}
        maxLength={120}
        placeholder={'Enter your feedback'}
        placeholderTextColor={'#333'}
        underlineColorAndroid={'transparent'}
      />
      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.button
        ]}>
        {({ pressed }) => (
          <Text style={styles.buttonText}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#fdfdfd',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#425df5',
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20,

  }

});
