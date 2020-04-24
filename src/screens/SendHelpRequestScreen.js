/* eslint-disable global-require */
import React, { useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import PropTypes from 'prop-types';
import Input from '../components/common/Input';
import axiosInstance from '../apiInstance';

const SendHelpRequestScreen = ({ onOkPress }) => {
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      padding: 10,
    },
    buttonContainerStyle: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    titleStyle: {
      fontSize: 40,
    },
    errorMessageStyle: {
      color: 'red',
      padding: 10,
    },
    sendTextStyle: {
      marginHorizontal: 40,
      marginVertical: 20,
      color: 'green',
      padding: 20,
      textAlign: 'center',
      fontSize: 20,
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 5,
    },
  });

  const [helpRequest, setHelpRequest] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    titleStyle,
    errorMessageStyle,
    containerStyle,
    buttonContainerStyle,
    sendTextStyle,
  } = styles;

  const createHelpRequestSentAlert = () =>
    Alert.alert(
      'Help request sent',
      'Your help request was sent, you can see the status on the next screen',
      [
        {
          text: 'OK',
          onPress: () => {
            onOkPress();
          },
        },
      ],
      { cancelable: false }
    );

  const sendRequest = (latitude, longitude) => {
    const { name, description, phoneNumber, addressTip } = helpRequest;
    if (latitude === undefined || longitude === undefined) {
      setErrorMessage('Location not found. Please allow the application to access location.');
      return;
    }

    if (name === undefined) {
      setErrorMessage('Please enter a name');
      return;
    }

    if (description === undefined) {
      setErrorMessage('Please enter a description');
      return;
    }

    if (phoneNumber === undefined) {
      setErrorMessage('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    axiosInstance({
      method: 'POST',
      url: `help`,
      data: { lat: latitude, long: longitude, description, name, addressTip, phoneNumber },
    })
      .then(() => {
        setIsLoading(false);
        setErrorMessage('');
        setHelpRequest({});
        createHelpRequestSentAlert();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
      });
  };

  const getLocationAndSendRequest = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        sendRequest(latitude, longitude);
      },
      () => {
        setErrorMessage('Location not found. Please allow the application to access location.');
      }
    );
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Send help request</Text>
      <Input
        labelText="Name:"
        defaultValue={helpRequest.name}
        placeholder="John Doe"
        imageSource={require('../../assets/NameIcon.jpg')}
        onChangeText={(name) => {
          setHelpRequest({ ...helpRequest, name });
        }}
      />
      <Input
        labelText="Description:"
        defaultValue={helpRequest.description}
        placeholder="I need help with"
        imageSource={require('../../assets/DescriptionIcon.png')}
        onChangeText={(description) => {
          setHelpRequest({ ...helpRequest, description });
        }}
      />
      <Input
        labelText="Phone number:"
        defaultValue={helpRequest.phoneNumber}
        placeholder="+40734080381"
        imageSource={require('../../assets/PhoneIcon.png')}
        onChangeText={(phoneNumber) => {
          setHelpRequest({ ...helpRequest, phoneNumber });
        }}
      />
      <Input
        labelText="Address tip (optional)"
        defaultValue={helpRequest.addressTip}
        placeholder="Near the postal office"
        imageSource={require('../../assets/AddressIcon.png')}
        onChangeText={(addressTip) => {
          setHelpRequest({ ...helpRequest, addressTip });
        }}
      />
      {errorMessage ? <Text style={errorMessageStyle}>{errorMessage}</Text> : null}
      <View style={buttonContainerStyle}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity onPress={getLocationAndSendRequest}>
            <Text style={sendTextStyle}>Request Help</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

SendHelpRequestScreen.propTypes = {
  onOkPress: PropTypes.func.isRequired,
};

export default SendHelpRequestScreen;
