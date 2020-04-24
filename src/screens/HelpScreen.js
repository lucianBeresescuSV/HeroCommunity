import React, { useState } from 'react';
import WaitingScreen from './WaitingScreen';
import SendHelpRequestScreen from './SendHelpRequestScreen';

const HelpScreen = () => {
  const [isWaiting, setIsWaiting] = useState(false);

  const waitingScreen = (
    <WaitingScreen
      onCancelPress={() => {
        setIsWaiting(false);
      }}
    />
  );

  const sendHelpRequestScreen = (
    <SendHelpRequestScreen
      onOkPress={() => {
        setIsWaiting(true);
      }}
    />
  );

  return isWaiting ? waitingScreen : sendHelpRequestScreen;
};

export default HelpScreen;
