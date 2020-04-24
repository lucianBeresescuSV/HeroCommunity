/* eslint-disable global-require */
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const InitialScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    imageStyle: {
      resizeMode: 'contain',
      width: 300,
      height: 300,
    },
  });

  const { containerStyle, imageStyle } = styles;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WantToHelp');
        }}
      >
        <Image style={imageStyle} source={require('../../assets/IWantToHelp.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Help');
        }}
      >
        <Image style={imageStyle} source={require('../../assets/HelpMe2.png')} />
      </TouchableOpacity>
    </View>
  );
};

InitialScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InitialScreen;
