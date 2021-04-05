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
import {signup} from './../../actions/signup';
import RNModalPicker from './../../components/RNModalPicker';
import {DISTRICT_LIST} from './../../constants/app-constants';
import colors from '../../assets/colors/colors';
import LabelText from './../../components/LabelText';

class EditProfile extends Component {
  state = {
    name: undefined,
    email: undefined,
    phone: undefined,
    gender: 'male',
    blood: undefined,
    showDatePicker: false,
    showLastDonatedDatePicker: false,
    dateofbirth: undefined,
    disease: undefined,
    district: undefined,
    location: undefined,
    role: undefined,
    loading: false,
    last_blood_donated: undefined,
  };
  constructor(props) {
    super(props);
    this.setState({
      gender: this.props.userData['sex'],
    });

    const person = {
      id: '',
      name: '',
    };
    var list = [];

    var count = 1;
    console.log(DISTRICT_LIST.length);
    DISTRICT_LIST.forEach(function (entry) {
      console.log(entry);
      const me = Object.create(person);
      me.id = count;
      me.name = entry;
      list.push(me);
      count = count + 1;
    });
    console.log(JSON.stringify(list));
    this.state = {
      districtlist: list,
    };
  }

  componentDidMount() {
    this.setState({name: this.props.userData['name']});
  }

  toggleLogin(value) {
    this.setState({
      loading: value,
    });
  }

  validate = () => {
    const {
      name,
      email,
      phone,
      password,
      confirmpassword,
      gender,
      blood,
      dateofbirth,
      district,
    } = this.state;
    console.log('name' + this.state.name, this.state.email);
    const check = validator.validate(this.state.email.replace(/\s/g, ''));
    if (check === true) {
      if (password !== '') {
        if (password.length > 8) {
          if (name !== '') {
            if (phone !== '') {
              if (confirmpassword !== '') {
                if (password === confirmpassword) {
                  if (gender !== '') {
                    if (blood !== '') {
                      if (dateofbirth != '') {
                        if (district != '') {
                          const value = {
                            name: this.state.name,
                            email: this.state.email.replace(/\s/g, ''),
                            mobile: this.state.phone,
                            password: this.state.password,
                            password_confirmation: this.state.confirmpassword,
                            sex: this.state.gender,
                            role_id: this.state.role,
                            blood_group: this.state.blood,
                            disease: this.state.disease,
                            district: this.state.district,
                            location: this.state.location,
                            date_of_birth: this.state.dateofbirth,
                            last_blood_donated: this.state.last_blood_donated,
                          };
                          this.toggleLogin(true);

                          this.props.actions.signup({
                            signUpDetails: value,

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
                          alert('District is required');
                        }
                      } else {
                        alert('Date of birth is required');
                      }
                    } else {
                      alert('Blood Type is Required');
                    }
                  } else {
                    alert('Gender is Required');
                  }
                } else {
                  alert('Password and Cofirm password is not same');
                }
              } else {
                alert('Confirm password is Required');
              }
            } else {
              alert('Phone No is Required');
            }
          } else {
            alert('Name is Required');
          }
        } else {
          alert('Password should be of 8 Characters');
        }
      } else {
        alert('password is Required');
      }
    } else {
      alert('email is incorect');
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
          title={'Edit Profile'}
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
            <View style={styles.txtinputContainer}>
              <AppTextinput
                name={'Name'}
                onChangeText={(name) => this.setState({name})}
                defaultValue={this.props.userData['name']}
              />
              <AppTextinput
                name={'Email'}
                onChangeText={(email) => this.setState({email})}
                defaultValue={this.props.userData['email']}
              />
              <AppTextinput
                name={'Phone'}
                onChangeText={(phone) => this.setState({phone})}
                keyboardType={'numeric'}
                defaultValue={this.props.userData['mobile']}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showDatePicker: true,
                  })
                }>
                <AppTextinput
                  name={'Date Of Birth'}
                  onChangeText={(dateofbirth) => this.setState({dateofbirth})}
                  editable={false}
                  value={this.state.dateofbirth}
                  defaultValue={this.props.userData['date_of_birth']}
                />
                <View>
                  {this.state.showDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={date}
                      mode={'date'}
                      is24Hour={false}
                      display="spinner"
                      maximumDate={date}
                      onChange={this.setDate}
                      // onChange={this.setState({
                      //   selectedDate:,
                      // })}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <AppTextinput
                name={'Disease'}
                onChangeText={(disease) => this.setState({disease})}
                defaultValue={this.props.userData['disease']}
              />

              <View style={{margin: 12}}>
                <RNModalPicker
                  dataSource={this.state.districtlist}
                  dummyDataSource={this.state.districtlist}
                  pickerTitle={'Select District'}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={'fade'}
                  searchBarPlaceHolder={'Search'}
                  showPickerTitle={true}
                  placeHolderLabel={'Select District'}
                  selectedLabel={this.state.district}
                  dropDownImage={require('../../assets/icons/ic_drop_down.png')}
                  selectedValue={(index, item) =>
                    this._selectedValueMaterial(index, item)
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showLastDonatedDatePicker: true,
                  })
                }>
                <LabelText
                  label={'Select if you have donated blood in last 100 days'}
                />

                <AppTextinput
                  name={'Last Blood Donated Date'}
                  onChangeText={(lastblooddonated) =>
                    this.setState({last_blood_donated: lastblooddonated})
                  }
                  editable={false}
                  value={this.state.last_blood_donated}
                  defaultValue={this.props.userData['last_donated_blood']}
                />
                <View>
                  {this.state.showLastDonatedDatePicker && (
                    <DateTimePicker
                      testID="datePickerLastDonated"
                      value={lastDonated}
                      mode={'date'}
                      is24Hour={false}
                      display="spinner"
                      maximumDate={date}
                      onChange={this.setLastDonatedDate}
                      // onChange={this.setState({
                      //   selectedDate:,
                      // })}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.gtxt}>Gender</Text>
            <View style={styles.imgContainer}>
              <TouchableOpacity style={styles.img}>
                {this.state.gender === 'male' ? (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/man.png')}
                    tintColor={colors.primary}
                  />
                ) : (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/man.png')}
                    tintColor={colors.textDarkGray}
                  />
                )}
                <Text
                  style={[
                    styles.txtf,
                    ,
                    {
                      color:
                        this.state.gender === 'male'
                          ? '#ea5455'
                          : colors.textDarkGray,
                    },
                  ]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({gender: 'Female'})}
                style={styles.img2}>
                {this.state.gender === 'Female' ? (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/woman.png')}
                    tintColor={colors.primary}
                  />
                ) : (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/woman.png')}
                    tintColor={colors.textDarkGray}
                  />
                )}
                <Text
                  style={[
                    styles.txtf,
                    {
                      color:
                        this.state.gender === 'Female'
                          ? '#ff7171'
                          : colors.textDarkGray,
                    },
                  ]}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.gtxt}>Role</Text>
            <View style={styles.imgContainer}>
              <TouchableOpacity
                onPress={() => {
                  const r = '2';
                  this.setState({role: r});
                }}
                style={styles.img2}>
                {this.state.role === '2' ? (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/give.png')}
                    tintColor={colors.primary}
                  />
                ) : (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/give.png')}
                    tintColor={colors.textDarkGray}
                  />
                )}
                <Text
                  style={[
                    styles.txtf,
                    ,
                    {
                      color:
                        this.state.role === '2'
                          ? '#ea5455'
                          : colors.textDarkGray,
                    },
                  ]}>
                  Donor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({role: '3'})}
                style={styles.img2}>
                {this.state.role === '3' ? (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/receive.png')}
                    tintColor={colors.primary}
                  />
                ) : (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/receive.png')}
                    tintColor={colors.textDarkGray}
                  />
                )}
                <Text
                  style={[
                    styles.txtf,
                    {
                      color:
                        this.state.role === '3'
                          ? '#ff7171'
                          : colors.textDarkGray,
                    },
                  ]}>
                  Receiver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({role: '4'})}
                style={styles.img2}>
                {this.state.role === '4' ? (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/both.png')}
                    tintColor={colors.primary}
                  />
                ) : (
                  <Image
                    style={styles.imgs}
                    source={require('../../assets/both.png')}
                    tintColor={colors.textDarkGray}
                  />
                )}
                <Text
                  style={[
                    styles.txtf,
                    {
                      color:
                        this.state.role === '4'
                          ? '#ff7171'
                          : colors.textDarkGray,
                    },
                  ]}>
                  Donor/Receiver
                </Text>
              </TouchableOpacity>
            </View>
          </View>

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
                    backgroundColor:
                      this.state.blood === 'A+' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'A+'
                          ? '#fff'
                          : colors.textDarkGray,
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
                    backgroundColor:
                      this.state.blood === 'A-' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'A-'
                          ? '#fff'
                          : colors.textDarkGray,
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
                    backgroundColor:
                      this.state.blood === 'B+' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'B+'
                          ? '#fff'
                          : colors.textDarkGray,
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
                    backgroundColor:
                      this.state.blood === 'B-' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'B-'
                          ? '#fff'
                          : colors.textDarkGray,
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
                    backgroundColor:
                      this.state.blood === 'O+' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'O+'
                          ? '#fff'
                          : colors.textDarkGray,
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
                    backgroundColor:
                      this.state.blood === 'O-' ? '#ff7171' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.txta,
                    ,
                    {
                      color:
                        this.state.blood === 'O-'
                          ? '#fff'
                          : colors.textDarkGray,
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
                      color:
                        this.state.blood === 'AB+'
                          ? '#fff'
                          : colors.textDarkGray,
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
                      color:
                        this.state.blood === 'AB-'
                          ? '#fff'
                          : colors.textDarkGray,
                    },
                  ]}>
                  AB-
                </Text>
              </TouchableOpacity>
            </View>

            {/* end */}
          </View>
          <View style={styles.btnview}>
            <AppButton title={'Signup'} onPress={() => this.validate()} />
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
        signup,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('70%'),
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
