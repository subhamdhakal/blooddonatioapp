/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable handle-callback-err */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {AppButton, NavHeader, AppTextinput} from '../../components';
import {bindActionCreators} from 'redux';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';

import {connect} from 'react-redux';
import colors from './../../assets/colors/colors';
import {AntDesign} from 'react-native-vector-icons/AntDesign';
import {requestblood} from './../../actions/bloodrequest';
import AnimatedLoader from 'react-native-animated-loader';
import PushNotification from 'react-native-push-notification';

class SendPersonalRequest extends Component {
  state = {
    blood: '',
    latitude: '',
    longitude: '',
    address: this.props.userData['user']['address'],
    loading: false,
    email: this.props.userData['user']['email'],
    phone_no: this.props.userData['user']['phone'],
  };
  toggleLoading(value) {
    this.setState({
      loading: value,
    });
  }
  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
        Geocoder.init('AIzaSyC_GdHrPH8BgAvnlW2yNMuVNuJGMZTEHl0'); // use a valid API key
        Geocoder.from(location.latitude, location.longitude)
          .then((json) => {
            var addressComponent = json.results[0].address_components[0];
            this.setState({
              latitude: '' + location.latitude,
              longitude: '' + location.longitude,
              address: '' + addressComponent['long_name'],
            });
            console.log(addressComponent);
          })
          .catch((error) => console.warn(error));
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  getRequestLocation() {}
  toggleLogin(value) {
    this.setState({
      loading: value,
    });
  }

  validateAndPost() {
    if (this.state.blood != '') {
      if (this.state.phone_no != '') {
        const value = {
          email: this.state.email,
          phone_no: this.state.phone_no,
          address: this.state.address,
          blood_group: this.state.blood,
          status: 'PENDING',
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        };
        this.toggleLogin(true);

        this.props.actions.requestblood({
          accessToken: this.props.access_token,
          value: value,

          onSuccess: (bloodrequestid) => {
            PushNotification.subscribeToTopic(bloodrequestid);
            this.props.navigation.replace('BottomTab');
            alert('Blood request posted successfully!');
            this.toggleLogin(false);
          },
          onFailure: (errorMsg) => {
            this.toggleLogin(false);
            alert(errorMsg);

            //Alert error message
          },
        });
      } else {
        alert('Please enter phone number');
      }
    } else {
      alert('Please select blood group');
    }
  }
  render() {
    return (
      <View style={styles.Container}>
        <NavHeader
          onPress={() => this.props.navigation.goBack()}
          title={'Send Individual Request'}
        />
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/loader.json')}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
        <Text style={styles.detail}>Donar Detail</Text>

        {/* add */}
        <View style={styles.botmContainer}>
          <View style={styles.flatlistItem}>
            <View style={styles.leftContainer}>
              <Avatar.Text
                size={64}
                color={colors.white}
                label={item.blood_group}
                style={{backgroundColor: colors.primary}}
                labelStyle={{
                  fontFamily: 'HelveticaNowDisplay-Regular',
                  fontSize: 32,
                }}
              />
            </View>
            <View style={styles.RightContainer}>
              <Text style={styles.nametxt}>{item.full_name}</Text>
              <Text style={styles.gendertxt}>{item.sex}</Text>
              <Text style={styles.addresstxt}>{item.mobile}</Text>
              <Text style={styles.addresstxt}>{item.district}</Text>
            </View>
            <View style={styles.LastContainer}>
              <TouchableOpacity
                style={{elevation: 5}}
                onPress={() => {
                  this.makePhoneCall(item.mobile);
                }}>
                <AntDesign name="phone" color={colors.acceptGreen} size={26} />
                <Text style={styles.labelText}>Call</Text>
              </TouchableOpacity>
              <View style={styles.frespace}></View>
              <TouchableOpacity
                style={{elevation: 5}}
                onPress={() =>
                  this.props.navigation.replace('SendPersonalRequest', {
                    item: item,
                  })
                }>
                <AntDesign
                  name="notification"
                  color={colors.primary}
                  size={26}
                />
                <Text style={styles.labelText}>Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <AntDesign name="appstore1" color={colors.primary} size={26} /> */}

          {/* <Text style={styles.txtl}>
            {'Current Location: ' + this.state.address}
          </Text> */}
        </View>
        <View style={styles.btn}>
          <AppButton
            title={'Submit'}
            onPress={() => {
              this.validateAndPost();
            }}
          />
        </View>

        {/* end */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.loginResponse,
    access_token: state.loginReducer.loginResponse['token'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({requestblood}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendPersonalRequest);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContainerView: {
    alignItems: 'center',
    marginTop: h('1%'),
  },
  lottie: {
    width: 200,
    height: 200,
  },
  detail: {
    fontSize: h('2.5%'),
    color: 'black',
    marginLeft: h('7%'),
    marginTop: h('3%'),
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
  },
  botmContainer: {
    // backgroundColor: 'tomato',
    width: '100%',
    height: h('30%'),
    // flexDirection: 'row',
  },
  gtxt: {
    fontSize: h('2.5%'),
    color: 'black',
    marginLeft: h('7%'),
    marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
  },
  circle: {
    // backgroundColor: 'yellow',
    width: '10%',
    height: '20%',
    borderRadius: h('10%'),
    marginTop: h('3%'),
    marginLeft: h('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: h('0.1%'),
    borderColor: 'rgba(0,0,0,0.3)',
  },
  txta: {
    fontSize: h('2%'),
    // color: this.state.blood !== '' ? 'white' : 'black',
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  txtl: {
    fontSize: h('2%'),
    // color: this.state.blood !== '' ? 'white' : 'black',
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  BottomContainerView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: -h('20%'),
    marginLeft: h('6%'),
    // justifyContent: 'center',
  },
  BotomContainerView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {alignItems: 'center', width: '100%'},
});
