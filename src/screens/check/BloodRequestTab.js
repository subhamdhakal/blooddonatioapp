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
  Alert,
  Linking,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import AnimatedLoader from 'react-native-animated-loader';

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
import call from 'react-native-phone-call';
import {requestblood} from './../../actions/bloodrequest';

class BloodRequestTab extends Component {
  state = {
    searchTerm: '',
    data: this.props.donorList,
  };
  constructor(props) {
    super(props);
    this.arrayholder = this.props.donorList;
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
            style={{
              elevation: 5,
              alignItems: 'center',
            }}
            onPress={() => this.makePhoneCall(item.phone_no)}>
            <AntDesign name="phone" color={colors.acceptGreen} size={26} />
            <Text style={styles.labelText}>Call</Text>
          </TouchableOpacity>
          {item.latitude === '' ? null : (
            <TouchableOpacity
              style={{elevation: 5, alignItems: 'center'}}
              onPress={() =>
                this._goToYosemite({
                  latitude: item.latitude,
                  longitude: item.longitude,
                })
              }>
              <AntDesign name="find" color={colors.primary} size={26} />
              <Text style={styles.labelText}>Location</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
  _goToYosemite({latitude, longitude}) {
    // console.log(latitude + '' + longitude);
    // openMap({
    //   navigate_mode: 'navigate',
    //   end:"",
    //   latitude: parseFloat(latitude),
    //   longitude: parseFloat(longitude),
    // });
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  }
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
      <View {...this.props} style={styles.Container}>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/loader.json')}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
        {/* <NavHeader
          title={'Blood Requests'}
          onPress={() => this.props.navigation.goBack()}
        /> */}
        <SearchBar
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
            }}
            data={this.props.data}
            renderItem={({item}) => this.RenderItem(item)}
            animationType={AnimationType.SlideFromRight}
            keyExtractor={(item) => item.full_name}
            animationDuration={1000}
            focused={true}
          />
          <View style={styles.frespace}></View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    donorList: state.dataReducer.donorList,
    access_token: state.loginReducer.loginResponse['token'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({requestblood}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodRequestTab);

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
  flatlistContainer: {
    alignItems: 'center',
    marginTop: h('2%'),
    elevation: 5,
  },
  labelText: {
    fontFamily: 'HelveticaNowDisplay-Regular',
    fontSize: 10,
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
    width: '20%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
