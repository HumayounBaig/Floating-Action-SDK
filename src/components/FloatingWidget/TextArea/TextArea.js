import React, { useState } from 'react';
import Textarea from 'react-native-textarea';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export const TextArea = (params) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    console.log('feedbackText', feedbackText)
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
    backgroundColor: '#dedede',
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
