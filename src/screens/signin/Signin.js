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
import AsyncStorage from '@react-native-community/async-storage';
import {login} from './../../actions/login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';

class Signin extends Component {
  state = {
    email: 'santoshstha2017@gmail.com',
    password: 's@nty143',
    loading: false,
  };

  toggleLogin(value) {
    this.setState({
      loading: value,
    });
  }

  validata = () => {
    const {email, password} = this.state;
    if (email !== '') {
      if (password !== '') {
        this.toggleLogin(true);
        this.props.actions.login({
          email: this.state.email,
          password: this.state.password,
          onSuccess: () => {
            this.toggleLogin(false);
            this.props.navigation.replace('BottomTab');
          },
          onFailure: () => {
            //Alert error message
            // this.setState({
            //   modalVisible: false,
            // });
            this.toggleLogin(true);
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

export default connect(null, mapDispatchToProps)(Signin);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontFamily: 'HelveticaNowDisplay-Regular',
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
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  stxt: {
    color: '#ea5455',
    fontSize: h('2%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
  },
  hand: {
    resizeMode: 'contain',
    height: h('30%'),
  },
});
