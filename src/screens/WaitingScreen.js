import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';

const Pulse = require('react-native-pulse').default;

const WaitingScreen = ({ onCancelPress }) => {
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      padding: 10,
    },
    waitingMessageStyle: {
      textAlign: 'center',
      fontSize: 25,
      padding: 20,
    },
  });

  const { containerStyle, waitingMessageStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={waitingMessageStyle}>
        Help request sent. Someone will accept your request shortly. Please wait
      </Text>
      <Pulse color="green" numPulses={3} diameter={400} speed={20} duration={2000} />
      <Button color="red" title="Cancel Request" onPress={onCancelPress} />
    </View>
  );
};

WaitingScreen.propTypes = {
  onCancelPress: PropTypes.func.isRequired,
};

export default WaitingScreen;
