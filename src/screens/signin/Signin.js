/* eslint-disable handle-callback-err */
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
import {AppButton, NavHeader, AppTextinput} from '../../components';
import {login} from './../../actions/login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import {configureNotification} from './../../utils/NotificationConfigure';
import {AsyncStorage} from '@react-native-community/async-storage';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
  };

  toggleLogin(value) {
    this.setState({
      loading: value,
    });
  }

  validata = () => {
    configureNotification();

    const {email, password} = this.state;
    if (email !== '') {
      if (password !== '') {
        this.toggleLogin(true);
        this.props.actions.login({
          email: this.state.email.trim(),
          password: this.state.password,
          onSuccess: () => {
            this.props.navigation.replace('BottomTab');
            this.toggleLogin(false);
          },
          onFailure: (errorMsg) => {
            //Alert error message
            // this.setState({
            //   modalVisible: false,
            // });
            this.toggleLogin(false);
            alert(errorMsg);
          },
        });
      } else {
        alert('Password is Required');
      }
    } else {
      alert('Email is Required');
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <NavHeader
          title={'Sign In'}
          onPress={() => this.props.navigation.goBack()}
        />
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/loader.json')}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
        <KeyboardAwareScrollView>
          {/* top */}
          <View style={styles.bgContainer}>
            <Image
              style={styles.hand}
              source={require('../../assets/hand.png')}
            />
            <AppTextinput
              name={'Email'}
              onChangeText={(email) => this.setState({email})}
            />
            <AppTextinput
              name={'Password'}
              password={true}
              onChangeText={(password) => this.setState({password})}
            />
            <TouchableOpacity style={styles.ftxtContainer}>
              <Text style={styles.ftxt}>Forgot Password ?</Text>
            </TouchableOpacity>
            <AppButton title={'Sign In'} onPress={() => this.validata()} />
          </View>
          {/* bottom */}
          <View style={styles.bottomContainer}>
            <View style={styles.BtoomContainer}>
              <Text style={styles.atxt}>Dont have a Account ! </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}
              style={styles.SContainer}>
              <Text style={styles.stxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        login,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  bgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: h('10%'),
    // backgroundColor: 'red',
    width: w('100%'),
    height: h('70%'),
  },
  ftxtContainer: {
    marginRight: h('28%'),
    marginTop: h('2%'),
  },
  ftxt: {
    color: '#ea5455',
    fontSize: h('1.8%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
    marginLeft: h('4%'),
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  BtoomContainer: {
    // backgroundColor: 'gold',
    height: h('7%'),
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SContainer: {
    // backgroundColor: 'green',
    height: h('7%'),
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  atxt: {
    color: 'black',
    fontSize: h('1.4%'),

    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  stxt: {
    color: '#ea5455',
    fontSize: h('1.8%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  hand: {
    resizeMode: 'contain',
    height: h('30%'),
  },
});
