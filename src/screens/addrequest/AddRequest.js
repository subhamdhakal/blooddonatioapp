/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable handle-callback-err */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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
class AddRequest extends Component {
  state = {
    blood: '',
    latitude: '',
    longitude: '',
    address: 'Fetching...',
    loading: false,
    email: '',
    phone_no: '',
    latitude: '',
    longitude: '',
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
        Geocoder.init('AIzaSyCp_eYV5VpunCIETQwG6SECfCsDOllLvqk'); // use a valid API key
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

  validateAndPost() {
    if (this.state.blood != '') {
      const value = {
        email: 'blooddonate+239@gmail.com',
        phone_no: '9849210248',
        address: 'tt',
        blood_group: 'O+',
        status: 'PENDING',
        created_date: '2020-12-01',
        latitude: '27.75791000',
        longitude: '85.30256721',
      };
      this.toggleLogin(true);

      this.props.actions.signup({
        bloodRequestValue: value,

        onSuccess: () => {
          this.toggleLogin(false);
          this.props.navigation.replace('BottomTab');
        },
        onFailure: (errorMsg) => {
          this.toggleLogin(false);
          alert(errorMsg);

          //Alert error message
        },
      });
    } else {
      alert('Please select blood group');
    }
  }
  render() {
    return (
      <View style={styles.Container}>
        <NavHeader
          onPress={() => this.props.navigation.goBack()}
          title={'Add Request'}
        />
        <Text style={styles.detail}>Details</Text>
        <View style={styles.ContainerView}>
          <AppTextinput
            name={'Email'}
            defaultValue={this.props.userData['user']['email']}
          />
          <AppTextinput
            name={'Phone No'}
            defaultValue={this.props.userData['user']['mobile']}
          />
          <AppTextinput
            name={'Address'}
            defaultValue={this.props.userData['user']['location']}
          />
        </View>

        {/* add */}
        <View style={styles.botmContainer}>
          <Text style={styles.gtxt}>Select Blood Group</Text>
          {/* circle */}

          <View style={styles.BotomContainerView}>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'A+'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'A+' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'A+' ? '#fff' : '#000',
                  },
                ]}>
                A+
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'A-'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'A-' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'A-' ? '#fff' : '#000',
                  },
                ]}>
                A-
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'B+'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'B+' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'B+' ? '#fff' : '#000',
                  },
                ]}>
                B+
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'B-'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'B-' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'B-' ? '#fff' : '#000',
                  },
                ]}>
                B-
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'O+'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'O+' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'O+' ? '#fff' : '#000',
                  },
                ]}>
                O+
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'O-'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor: this.state.blood === 'O-' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'O-' ? '#fff' : '#000',
                  },
                ]}>
                O-
              </Text>
            </TouchableOpacity>
          </View>
          {/* circle 2 */}
          <View style={styles.BottomContainerView}>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'AB+'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor:
                    this.state.blood === 'AB+' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'AB+' ? '#fff' : '#000',
                  },
                ]}>
                AB+
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({blood: 'AB-'});
              }}
              style={[
                styles.circle,
                {
                  backgroundColor:
                    this.state.blood === 'AB-' ? '#ff7171' : null,
                },
              ]}>
              <Text
                style={[
                  styles.txta,
                  ,
                  {
                    color: this.state.blood === 'AB-' ? '#fff' : '#000',
                  },
                ]}>
                AB-
              </Text>
            </TouchableOpacity>
          </View>

          {/* end */}
        </View>
        <View style={{alignItems: 'center'}}>
          {/* <AntDesign name="appstore1" color={colors.primary} size={26} /> */}

          <Text style={styles.txtl}>
            {'Current Location: ' + this.state.address}
          </Text>
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
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContainerView: {
    alignItems: 'center',
    marginTop: h('1%'),
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
