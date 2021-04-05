import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import colors from './../assets/colors/colors';

export class AppButton extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props} style={styles.btnContainer}>
        <View style={styles.btn}>
          <Text style={styles.btntxt}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.primary,
    height: h('6%'),
    width: '50%',
    borderRadius: h('7%'),
    overflow: 'hidden',
    marginTop: h('2%'),
    elevation: 5,
  },
  btn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    color: 'white',
    fontSize: h('2%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
});
