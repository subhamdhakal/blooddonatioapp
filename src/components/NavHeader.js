/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
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
import {Surface} from 'react-native-paper';
import colors from './../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export class NavHeader extends Component {
  render() {
    return (
      <Surface style={styles.surface}>
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.props.onPress} style={styles.left}>
            <AntDesign name="arrowleft" color={colors.white} size={26} />
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text style={styles.txt}>{this.props.title}</Text>
          </View>
          <View style={styles.right}></View>
        </View>
      </Surface>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.primary,
    height: h('8%'),
    width: w('100%'),
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: h('0.1%'),
  },
  left: {
    // backgroundColor: 'red',
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    // backgroundColor: 'green',
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    // backgroundColor: 'gold',
    width: '15%',
    height: '100%',
  },
  txt: {
    color: 'white',
    fontSize: h('2.1%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  surface: {
    padding: 8,
    width: '100%',
    height: h('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 5,
    // backgroundColor: 'red',
    borderRadius: h('10%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
});
