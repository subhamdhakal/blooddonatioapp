/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {ProfilePic} from '../../components';
import {SliderBox} from 'react-native-image-slider-box';

export class Dashboard extends Component {
  state = {
    images: [
      'https://source.unsplash.com/1024x768/?nature',
      'https://source.unsplash.com/1024x768/?water',
      'https://source.unsplash.com/1024x768/?girl',
      'https://source.unsplash.com/1024x768/?tree', // Network image
    ],
  };
  render() {
    return (
      <ImageBackground
        style={styles.Container}
        source={require('../../assets/dash.png')}>
        <View style={styles.logo}>
          <SliderBox autoplay circleLoop images={this.state.images} />
        </View>
        <View style={styles.topview}>
          <View style={styles.Donar}>
            <View style={styles.leftContianer}>
              <Text style={styles.numbertxt}>12,421</Text>
              <Text style={styles.donartxt}>Donar's</Text>
            </View>
            <View style={styles.rightContianer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Donarscreen');
                }}
                style={styles.btn}>
                <Text style={styles.btntxt}>Find Donar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Donar}>
            <View style={styles.leftContianer}>
              <Text style={styles.numbertxt}>51,492</Text>
              <Text style={styles.donartxt}>Request's</Text>
            </View>
            <View style={styles.rightContianer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CheckReques');
                }}
                style={styles.btn}>
                <Text style={styles.btntxt}>See Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* bottom view */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    resizeMode: 'center',
  },
  Donar: {
    backgroundColor: '#fff2',
    width: w('80%'),
    height: h('20%'),
    borderRadius: h('1%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    marginTop: h('2%'),
  },
  topview: {
    alignItems: 'center',
    // marginTop: h('10%'),
    // backgroundColor: 'yellow',
  },
  bottomview: {
    alignItems: 'center',
    marginTop: h('3%'),
    // backgroundColor: 'yellow',
  },
  leftContianer: {
    // backgroundColor: 'red',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContianer: {
    // backgroundColor: 'green',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbertxt: {
    color: 'white',
    fontSize: h('4%'),
    fontWeight: '600',
  },
  donartxt: {
    color: 'white',
    fontSize: h('2.5'),
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'white',
    height: h('6%'),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: h('7%'),
    elevation: 4,
  },
  btntxt: {
    color: '#ea5455',
    fontWeight: 'bold',
    fontSize: h('2%'),
  },
  logo: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: h('35%'),
    alignItems: 'center',
  },
  btxt: {
    color: '#fff',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  imgbox: {
    backgroundColor: 'white',
    width: '35%',
    height: h('20%'),
    borderRadius: h('10%'),
    marginTop: h('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wtxt: {
    color: 'white',
    fontSize: h('3%'),
  },
  nametxt: {
    color: 'white',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
});
