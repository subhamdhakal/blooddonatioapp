/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {SliderBox} from 'react-native-image-slider-box';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {AppButton, NavHeader, AppTextinput} from '../../components';
var validator = require('email-validator');
import AsyncStorage from '@react-native-community/async-storage';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import colors from '../../assets/colors/colors';

class EventScreen extends Component {
  RenderItem = (item) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistItem}>
        <Image
          style={{width: '32%', height: '100%'}}
          source={{uri: item.image}}
        />
        <View
          style={{
            width: '68%',
            height: '100%',
            padding: 8,
          }}>
          <Text style={styles.nametxt}>{item.event_name}</Text>
          <Text style={styles.descriptiontxt}>{item.description}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              right: 8,
              alignSelf: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.datetxt}>{item.date_time}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.Container}>
        <ImageBackground
          source={require('../../assets/dash.png')}
          style={styles.ImageBackground}>
          <Text style={styles.imgtxt}>Upcoming Events</Text>
          <SliderBox autoplay circleLoop images={this.props.sliderImages} />
        </ImageBackground>
        <View style={styles.flatlistContainerView}>
          <AnimatedFlatList
            contentContainerStyle={{
              marginTop: -h('1%'),
            }}
            data={this.props.eventList}
            renderItem={({item}) => this.RenderItem(item)}
            animationType={AnimationType.SlideFromRight}
            keyExtractor={(item) => item.date_time}
            animationDuration={1000}
            focused={true}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    eventList: state.dataReducer.eventList,
    sliderImages: state.loginReducer.loginResponse['event_images'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  flatlistItem: {
    backgroundColor: '#fff',
    width: '90%',
    height: h('15%'),
    borderRadius: h('1%'),
    flexDirection: 'row',
  },
  flatlistContainer: {
    alignItems: 'center',
    marginTop: h('2%'),
  },
  ImageBackground: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('30%'),
    alignItems: 'center',
  },
  imgtxt: {
    color: 'white',
    fontSize: h('3%'),
    marginTop: h('3%'),
    marginBottom: h('2%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  flatlistContainerView: {
    backgroundColor: '#E6DDDD',
    height: '90%',
    flex: 1,
  },
  leftContainer: {
    // backgroundColor: '#000',
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RightContainer: {
    // backgroundColor: 'red',
    width: '40%',
    height: '100%',
  },
  imgcontainer: {
    backgroundColor: '#ea5455',
    borderRadius: h('100%'),
    width: '80%',
    height: '70%',
  },
  LastContainer: {
    // backgroundColor: 'yellow',
    width: '30%',
    alignItems: 'flex-end',
  },
  nametxt: {
    color: 'black',
    fontSize: h('1.8%'),
    marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  datetxt: {
    color: colors.primary,
    fontSize: h('1.8%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  descriptiontxt: {
    color: 'gray',
    fontSize: h('1.8%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  addresstxt: {
    color: 'silver',
    fontSize: h('2%'),
    // marginTop: h('1%'),
  },
  noConatiner: {
    // backgroundColor: 'red',
    width: '80%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: h('10%'),
    marginTop: h('3%'),
    borderColor: '#ea5455',
    borderWidth: 1,
    marginLeft: h('4%'),
  },
  requestContainr: {
    backgroundColor: '#FF215D',
    width: '80%',
    height: '25%',
    justifyContent: 'center',
    paddingLeft: h('2%'),
    // borderRadius: h('10%'),
    marginTop: h('3%'),

    borderTopLeftRadius: h('10%'),
    borderBottomLeftRadius: h('10%'),
  },
  circlebLood: {
    width: '50%',
    height: '42%',
    borderRadius: h('10%'),
    // backgroundColor: 'red',
    marginTop: h('5%'),
    marginRight: h('3%'),
    borderColor: 'silver',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circelTxt: {
    color: '#FF215D',
    fontSize: h('2.5%'),
  },
  requestTxt: {
    color: '#Ffff',
    fontSize: h('2%'),
  },
  frespace: {
    // backgroundColor: 'white',
    width: '100%',
    height: h('5%'),
    // marginTop: -h('50%'),
  },
});
