import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import colors from '../assets/colors/colors';

export class LabelAndField extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={{width: '30%'}}>
          <Text {...this.props} style={styles.labelTxt}>
            {this.props.labelText}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <Text {...this.props} style={styles.valueTxt}>
            {this.props.valueText}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#0001',
    width: w('85%'),
    height: h('8%'),
    borderRadius: h('10%'),
    paddingLeft: h('3%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  labelTxt: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: colors.primary,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    fontSize: h('1.5%'),
  },
  valueTxt: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: h('1.8%'),
    marginLeft: h('2%'),
    color: 'gray',
  },
});
