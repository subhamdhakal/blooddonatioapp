import React from 'react';
import colors from '../assets/colors/colors';
import {Text} from 'react-native';

const HeadLineText = ({label}) => {
  return (
    <Text
      style={{
        fontSize: 18,
        color: colors.primaryBlue,
        fontFamily: 'HelveticaNowDisplay-Bold',
      }}>
      {label}
    </Text>
  );
};

export default HeadLineText;
