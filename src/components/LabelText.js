import React from 'react';
import colors from '../assets/colors/colors';
import {Text} from 'react-native';

const LabelText = ({label}) => {
  return (
    <Text
      style={{
        fontFamily: 'HelveticaNowDisplay-Regular',
      }}>
      {label}
    </Text>
  );
};

export default LabelText;
