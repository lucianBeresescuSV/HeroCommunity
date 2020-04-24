import React from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';

const AccountScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          navigation.navigate('Initial');
        }}
      />
    </View>
  );
};

AccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AccountScreen;
