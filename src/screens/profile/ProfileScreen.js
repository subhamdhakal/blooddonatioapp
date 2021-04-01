/* eslint-disable react/self-closing-comp */
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
import {AppButton, NavHeader, AppTextinput, ProfilePic} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AnimatedFlatList, AnimationType} from 'flatlist-intro-animations';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import colors from './../../assets/colors/colors';
import {fetcheduserrequestlist} from '../../actions/fetchdata';
import {color} from 'react-native-reanimated';
import {LabelAndField} from './../../components/LabelAndField';

export class ProfileScreen extends Component {
  componentDidMount() {
    this.props.actions.fetcheduserrequestlist({
      accessToken: this.props.access_token,
      user_id: this.props.userData['user_id'],

      onSuccess: () => {
        // this.toggleLogin(false);
        // this.props.navigation.replace('BottomTab');
      },
      onFailure: () => {
        //Alert error message
        // this.setState({
        //   modalVisible: false,
        // });
      },
    });
  }

  render() {
    return (
      <View style={styles.Container}>
        <ImageBackground
          source={require('../../assets/dash.png')}
          style={styles.ImageBackground}>
          <Text style={styles.imgtxt}>User Profile</Text>
          <View style={styles.newRequest}>
            <View style={styles.left}>
              <Text style={styles.no}>
                {this.props.userData['blood_group']}
              </Text>
              <Text style={styles.Requst}>Blood Group</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddRequest');
                }}
                style={styles.btn}>
                <AntDesign name="edit" color={'#ea5455'} size={20} />
                <Text style={styles.btntxt}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* flat */}
        </ImageBackground>
        <View style={styles.flatlistContainerView}>
          <View style={styles.frespace}>
            <LabelAndField
              labelText={'Name:'}
              valueText={this.props.userData['name']}
            />
            <LabelAndField
              labelText={'DOB:'}
              valueText={this.props.userData['date_of_birth']}
            />
            <LabelAndField
              labelText={'Gender:'}
              valueText={this.props.userData['sex']}
            />
            <LabelAndField
              labelText={'Phone:'}
              valueText={this.props.userData['phone']}
            />
            <LabelAndField
              labelText={'Email:'}
              valueText={this.props.userData['email']}
            />
            <LabelAndField
              labelText={'District:'}
              valueText={this.props.userData['district']}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: h('4%'),
            }}>
            <AppButton
              title={'Log Out'}
              onPress={() => this.props.navigation.navigate('WelcomeScreen')}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mybloodrequest: state.dataReducer.bloodRequest,
    userData: state.loginReducer.loginResponse['user'],
    access_token: state.loginReducer.loginResponse['token'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetcheduserrequestlist,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
const styles = StyleSheet.create({
  Container: {
    flex: 1,
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
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  newRequest: {
    backgroundColor: '#fff2',
    width: '80%',
    height: h('15%'),
    flexDirection: 'row',
    borderRadius: h('1%'),
    marginTop: h('4%'),
  },
  left: {
    // backgroundColor: 'green',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    // backgroundColor: 'yellow',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'white',
    width: '95%',
    height: h('5%'),
    borderRadius: h('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: h('2%'),
  },
  btntxt: {
    color: '#ea5455',
    fontSize: h('2%'),
    marginLeft: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  no: {
    color: 'white',
    fontSize: h('4%'),
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  Requst: {
    color: 'white',
    fontSize: h('2%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
  flatlistItem: {
    backgroundColor: '#fff',
    width: '90%',
    height: h('15%'),
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: h('1%'),
    marginTop: h('1%'),
  },
  flatlistContainer: {
    alignItems: 'center',
    marginTop: h('2%'),
  },
  flatlistContainerView: {
    backgroundColor: '#E6DDDD',
    height: '100%',
    alignContent: 'center',
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
    justifyContent: 'center',
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
    fontSize: h('2%'),
    marginTop: h('3%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
  addresstxt: {
    color: 'silver',
    fontSize: h('2%'),
    // marginTop: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
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
  },
  requestContainr: {
    backgroundColor: '#FF215D',
    width: '75%',
    height: '25%',
    justifyContent: 'center',
    paddingLeft: h('1%'),
    // borderRadius: h('10%'),
    marginTop: h('3%'),

    borderTopLeftRadius: h('10%'),
    borderBottomLeftRadius: h('10%'),
  },
  circlebLood: {
    width: '30%',
    height: '30%',
    borderRadius: h('10%'),
    // backgroundColor: 'red',
    marginTop: h('2%'),
    marginRight: h('3%'),
    borderColor: 'silver',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circelTxt: {
    color: '#FF215D',
    fontSize: h('1.5%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
  requestTxt: {
    color: '#Ffff',
    fontSize: h('1.5%'),
    fontFamily: 'HelveticaNowDisplay-Medium',
  },
  frespace: {
    backgroundColor: 'white',
    width: '80%',
    height: h('35.1%'),
    alignSelf: 'center',
    marginTop: h('4%'),
    elevation: 5,
    borderRadius: 24,
    padding: h('4%'),
    alignContent: 'center',
    justifyContent: 'center',
    // marginTop: -h('50%'),
  },
});
