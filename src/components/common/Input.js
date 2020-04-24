import React from 'react';
import { Text, TextInput, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({ labelText, defaultValue, placeholder, onChangeText, imageSource }) => {
  const styles = StyleSheet.create({
    containerStyle: {
      padding: 10,
    },
    textInputStyle: {
      fontSize: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      alignContent: 'stretch',
      flex: 1,
    },
    labelStyle: {
      paddingVertical: 10,
      fontSize: 20,
    },
    bottomContainerStyle: {
      flexDirection: 'row',
    },
    imageStyle: {
      resizeMode: 'contain',
      width: 35,
      height: 35,
    },
  });

  const { textInputStyle, containerStyle, imageStyle, bottomContainerStyle, labelStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{labelText}</Text>
      <View style={bottomContainerStyle}>
        <Image style={imageStyle} source={imageSource} />
        <TextInput
          style={textInputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
        />
      </View>
    </View>
  );
};

Input.defaultProps = {
  defaultValue: '',
  onChangeText: () => {},
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  imageSource: PropTypes.number.isRequired,
  onChangeText: PropTypes.func,
};

export default Input;
