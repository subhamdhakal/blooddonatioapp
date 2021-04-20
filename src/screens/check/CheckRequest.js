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
  TextInput,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import call from 'react-native-phone-call';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {AppButton, NavHeader, AppTextinput} from '../../components';
var validator = require('email-validator');
import AsyncStorage from '@react-native-community/async-storage';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import colors from './../../assets/colors/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar, Button} from 'react-native-paper';
import {SearchableFlatList} from 'react-native-searchable-list';
import BloodRequestTab from './../check/BloodRequestTab';
const Tab = createMaterialTopTabNavigator();

class CheckRequest extends Component {
  state = {
    searchTerm: '',
    data: this.props.bloodRequest,
  };
  constructor(props) {
    super(props);
    this.arrayholder = this.props.bloodRequest;
  }
  RenderItem = (item) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistItem}>
        <View style={styles.leftContainer}>
          <Avatar.Text
            size={48}
            color={colors.white}
            label={item.blood_group}
            style={{backgroundColor: colors.primary}}
            labelStyle={{
              fontFamily: 'HelveticaNowDisplay-Regular',
              fontSize: 24,
            }}
          />
        </View>
        <View style={styles.RightContainer}>
          <Text style={styles.nametxt}>{item.full_name}</Text>
          <Text style={styles.gendertxt}>{item.created_date}</Text>
          <Text style={styles.addresstxt}>{item.address}</Text>
          <Text style={styles.addresstxt}>{item.phone_no}</Text>
        </View>
        <View style={styles.LastContainer}>
          <TouchableOpacity
            style={{elevation: 5}}
            onPress={() => this.makePhoneCall(item.mobile)}>
            <AntDesign name="phone" color={colors.acceptGreen} size={26} />
            <Text style={styles.labelText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{elevation: 5}}>
            <AntDesign name="find" color={colors.acceptGreen} size={26} />
            <Text style={styles.labelText}>Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  makePhoneCall = (phoneNumber) => {
    try {
      if (phoneNumber.length != 10) {
        alert('Invalid phone number');
        return;
      }
    } catch (err) {
      alert('Invalid phone number');
    }

    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  updateSearch = (search) => {
    this.setState({search});
  };
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.full_name.toUpperCase()} ${item.blood_group.toUpperCase()} `;

      // const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <View style={styles.Container}>
        <NavHeader
          title={'Blood Requests'}
          onPress={() => this.props.navigation.goBack()}
        />
        {/* <SearchBar
          placeholder="Search by Name, District, Blood Group..."
          onChangeText={(text) => this.searchFilterFunction(text)}
          value={this.state.value}
          clearIcon
          inputStyle={{
            backgroundColor: colors.white,
            fontFamily: 'HelveticaNowDisplay-Regular',
            fontSize: 14,
            borderColor: colors.white,
          }}
          inputContainerStyle={{
            backgroundColor: colors.white,
            borderColor: colors.white,
          }}
          lightTheme
          containerStyle={{
            backgroundColor: colors.white,
            borderColor: colors.white,
            borderWidth: 0,
          }}
        />
        <View style={styles.flatlistContainerView}>
          <AnimatedFlatList
            contentContainerStyle={{
              marginTop: -h('1%'),
              marginBottom: h('10%'),
            }}
            data={this.state.data}
            renderItem={({item}) => this.RenderItem(item)}
            animationType={AnimationType.SlideFromRight}
            keyExtractor={(item) => item.full_name}
            animationDuration={1000}
            focused={true}
          />
        </View> */}

        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: 'gray',
            indicatorStyle: {
              backgroundColor: colors.primary,
            },
            labelStyle: {
              fontFamily: 'HelveticaNowDisplay-Bold',
              fontSize: 14,
              textTransform: 'none',
            },
          }}>
          <Tab.Screen
            name={'Individual'}
            children={() => (
              // <TabScreen

              // />
              <BloodRequestTab data={this.props.individualRequest} />
            )}
          />
          <Tab.Screen
            name={'All'}
            children={() => (
              <BloodRequestTab data={this.props.bloodRequest} />
              // <TabScreen

              // />
            )}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bloodRequest: state.dataReducer.bloodRequest,
    individualRequest: state.dataReducer.individualRequest,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckRequest);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  flatlistItem: {
    backgroundColor: '#fff',
    width: '90%',
    height: h('15%'),
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: h('1%'),
  },
  flatlistContainerView: {
    backgroundColor: '#E6DDDD',
    height: '90%',
    flex: 1,
  },
  leftContainer: {
    // backgroundColor: '#000',
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RightContainer: {
    // backgroundColor: 'red',
    width: '50%',
    height: '100%',
    padding: h('2%'),
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgcontainer: {
    backgroundColor: '#ea5455',
    borderRadius: h('100%'),
    width: '80%',
    height: '70%',
  },
  LastContainer: {
    // backgroundColor: 'yellow',
  },
  nametxt: {
    color: colors.black,
    fontSize: h('1.6%'),
    marginTop: h('0.5%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  gendertxt: {
    color: colors.primary,
    fontSize: h('1.8%'),
    // marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  addresstxt: {
    color: 'gray',
    fontSize: h('1.8%'),
    // marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  notxt: {
    color: colors.primary,
    fontSize: h('1.2%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  noConatiner: {
    backgroundColor: colors.white,
    width: '80%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: h('1%'),
    marginTop: h('2%'),
    borderColor: '#ea5455',
    elevation: 5,
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
    width: '55%',
    height: '40%',
    borderRadius: h('10%'),
    // backgroundColor: 'red',
    marginRight: h('3%'),
    borderColor: 'silver',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  circelTxt: {
    color: '#FF215D',
    fontSize: h('3%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  requestTxt: {
    color: '#Ffff',
    fontSize: h('2%'),
  },
  frespace: {
    // backgroundColor: 'white',
    width: '100%',
    height: h('3%'),
    // marginTop: -h('50%'),
  },
});
