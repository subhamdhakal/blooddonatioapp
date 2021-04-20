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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import * as RootNavigation from './../../services/NavigationService';

import {ProfilePic} from '../../components';
import {SliderBox} from 'react-native-image-slider-box';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import loginReducer from '../../reducers/loginReducer';
import {fetchdonorlistandbloodrequest} from './../../actions/fetchdata';
import colors from './../../assets/colors/colors';
import {configureNotification} from './../../utils/NotificationConfigure';
import PushNotification from 'react-native-push-notification';

export function setupPushNotification(handleNotification) {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.foreground === true) {
        Alert.alert(notification.title, notification.body, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'View',
            onPress: () => RootNavigation.navigate(notification.data.route),
          },
        ]);
      } else {
        handleNotification(notification);
        // alert(JSON.stringify(notification));
      }
      // onAction replacement here

      // process the notification here

      // required on iOS only
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // Android only
    senderID: '221674244219',
    // iOS only
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
    requestPermissions: Platform.OS === 'ios',
  });
  return PushNotification;
}

class Dashboard extends Component {
  state = {
    blood_group_notification: this.props.blood_group_notification,
  };

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    // configureNotification(this.props);

    this.pushNotification = setupPushNotification(this._handleNotificationOpen);

    console.log(
      'blood_group_notification' + JSON.stringify(this.props.userData),
    );
    PushNotification.subscribeToTopic('events');
    PushNotification.subscribeToTopic(this.props.blood_group_notification);
    PushNotification.subscribeToTopic(
      JSON.stringify(this.props.userData['id']),
    );

    this.props.actions.fetchdonorlistandbloodrequest({
      accessToken: this.props.access_token,
      userId: this.props.userData['id'],

      onSuccess: () => {
        // this.toggleLogin(false);
        // this.props.navigation.replace('BottomTab');
      },
      onFailure: () => {
        //Alert error message
        // this.setState({
        //   modalVisible: false,
        // });
        this.toggleLogin(true);
      },
    });
  }

  _handleNotificationOpen = (notification) => {
    const {navigate} = this.props.navigation;
    console.log('handke' + JSON.stringify(notification.data.route));
    navigate(notification.data.route);
  };
  render() {
    return (
      <ImageBackground
        style={styles.Container}
        source={require('../../assets/dash.png')}>
        <View style={styles.logo}>
          {/* <View
            style={{
              backgroundColor: colors.white,
              width: '100%',
              alignItems: 'center',
              padding: 8,
            }}>
            <Text
              style={{
                fontFamily: 'HelveticaNowDisplay-ExtraBold',
                color: colors.primary,
                fontSize: h('2%'),
              }}></Text>
          </View> */}
          <SliderBox autoplay circleLoop images={this.props.sliderImages} />
        </View>
        <View style={styles.topview}>
          <View style={styles.Donar}>
            <View style={styles.leftContianer}>
              <Text style={styles.numbertxt}>
                {this.props.total_count['donor_count']}
              </Text>
              <Text style={styles.donartxt}>Donor's</Text>
            </View>
            <View style={styles.rightContianer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Donarscreen');
                }}
                style={styles.btn}>
                <Text style={styles.btntxt}>Find Donor</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Donar}>
            <View style={styles.leftContianer}>
              <Text style={styles.numbertxt}>
                {this.props.total_count['request_count']}
              </Text>
              <Text style={styles.donartxt}>Request's</Text>
            </View>
            <View style={styles.rightContianer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CheckRequest');
                }}
                style={styles.btn}>
                <Text style={styles.btntxt}>Check Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* bottom view */}
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sliderImages: state.loginReducer.loginResponse['event_images'],
    access_token: state.loginReducer.loginResponse['token'],
    total_count: state.loginReducer.loginResponse['total_count'],
    userData: state.loginReducer.loginResponse['user'],

    blood_group_notification:
      state.loginReducer.loginResponse['blood_group_notification'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchdonorlistandbloodrequest,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

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
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  donartxt: {
    color: 'white',
    fontSize: h('2%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
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
    fontSize: h('1.8%'),
    marginLeft: h('1%'),
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
  },
  logo: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: h('30%'),
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
