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
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AnimatedLoader from 'react-native-animated-loader';

import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {AppButton, NavHeader, AppTextinput} from '../../components';
var validator = require('email-validator');
import AsyncStorage from '@react-native-community/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {changepasword} from './../../actions/signup';
import RNModalPicker from './../../components/RNModalPicker';
import {DISTRICT_LIST} from './../../constants/app-constants';
import colors from '../../assets/colors/colors';
import LabelText from './../../components/LabelText';

class ChangePassword extends Component {
  state = {
    oldpassword: '',
    newpassword: '',
    confimnewpassword: '',
  };

  toggleLogin(value) {
    this.setState({
      loading: value,
    });
  }

  validate = () => {
    const {oldpassword, newpassword, confimnewpassword} = this.state;
    console.log(
      this.state.oldpassword,
      this.state.newpassword,
      this.state.confimnewpassword,
    );
    if (oldpassword != '') {
      if (newpassword != '') {
        if (confimnewpassword != '') {
          if (newpassword === confimnewpassword) {
            const value = {
              old_password: this.state.oldpassword,
              new_password: this.state.newpassword,
              confirm_password: this.state.confimnewpassword,
            };
            this.toggleLogin(true);

            this.props.actions.changepasword({
              accessToken: this.props.access_token,
              passwordDetails: value,

              onSuccess: () => {
                this.toggleLogin(false);
                alert('Password Changed Successfully!');

                this.props.navigation.replace('Signin');
              },
              onFailure: (errorMsg) => {
                this.toggleLogin(false);
                alert(errorMsg);

                //Alert error message
              },
            });
          } else {
            alert('Password dont match');
          }
        } else {
          alert('Enter Confirm New password');
        }
      } else {
        alert('Enter New password');
      }
    } else {
      alert('Enter Old password');
    }
  };

  setDate = (event, date) => {
    if (date !== undefined) {
      // timeSetAction
      console.log(date);
      this.setState({
        dateofbirth: moment(date).format('YYYY-MM-DD').toString(),
        showDatePicker: false,
      });
    }
  };

  setLastDonatedDate = (event, date) => {
    if (date !== undefined) {
      // timeSetAction
      console.log('last donated date' + date);
      this.setState({
        last_blood_donated: moment(date).format('YYYY-MM-DD').toString(),
        showLastDonatedDatePicker: false,
      });
    }
  };
  showDatepicker = () => {
    this.setState({
      showDatePicker: true,
    });
  };
  _selectedValueMaterial(index, item) {
    this.setState({district: item.name});
  }

  render() {
    const date = new Date();
    const lastDonated = new Date();
    const {onChange} = this.props;

    return (
      <View style={styles.Container}>
        <NavHeader
          title={'Change Password'}
          onPress={() => this.props.navigation.goBack()}
        />
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/loader.json')}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
        {/* top */}

        <KeyboardAwareScrollView>
          <View style={styles.topContainer}>
            <AppTextinput
              name={'Old password'}
              onChangeText={(oldpassword) => this.setState({oldpassword})}
              password={true}
            />
            <AppTextinput
              name={'New Password'}
              onChangeText={(newpassword) => this.setState({newpassword})}
              password={true}
            />
            <AppTextinput
              name={'Confirm New Password'}
              onChangeText={(confimnewpassword) =>
                this.setState({confimnewpassword})
              }
              password={true}
            />
          </View>
          <View style={styles.btnview}>
            <AppButton
              title={'Change Password'}
              onPress={() => this.validate()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.loginResponse['user'],
    access_token: state.loginReducer.loginResponse['token'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        changepasword,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('60%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  midContainer: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: h('20%'),
  },
  botmContainer: {
    // backgroundColor: 'tomato',
    width: '100%',
    height: h('30%'),
  },
  gtxt: {
    fontSize: h('2.5%'),
    color: 'black',
    marginLeft: h('7%'),
    marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  txtinputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  imgContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',

    height: h('15%'),
  },
  img: {
    width: '50%',
    height: '100%',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderRightWidth: h('0.1%'),
  },
  imgr: {
    width: '30%',
    height: '100%',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderRightWidth: h('0.1%'),
  },
  img2: {
    width: '30%',
    height: '100%',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: 'rgba(0,0,0,0.2)',
    borderLeftWidth: h('0.1%'),
  },
  imgs: {
    height: h('8%'),
    width: '100%',
    resizeMode: 'contain',
  },
  txtf: {
    fontSize: h('1.5%'),
    marginTop: h('1.5%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  txtm: {
    color: '#000',
    marginTop: h('1.5%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  BotomContainerView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderWidth: h('0.3%'),
    borderColor: 'rgba(0,0,0,0.3)',
  },
  txta: {
    fontSize: h('1.6%'),
    fontFamily: 'HelveticaNowDisplay-Bold',

    // color: this.state.blood !== '' ? 'white' : 'black',
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
  btnview: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('20%'),
    alignItems: 'center',
    marginTop: -h('5%'),
  },
});
