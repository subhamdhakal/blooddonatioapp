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
  Alert,
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
import {
  fetcheduserrequestlist,
  deleteBloodRequest,
  completeBloodRequest,
} from '../../actions/fetchdata';
import {color} from 'react-native-reanimated';

export class MyRequest extends Component {
  componentDidMount() {
    this.fetchUserRequestList();
    console.log('user data ' + JSON.stringify(this.props.userData.id));
  }

  fetchUserRequestList() {
    this.props.actions.fetcheduserrequestlist({
      accessToken: this.props.access_token,
      user_id: this.props.userData.id,

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
  getStatusColor({status}) {
    switch (status) {
      case 'PENDING':
        return colors.pendingYellow;
        break;
      case 'COMPLETE':
        return colors.acceptGreen;
        break;

      case 'REQUESTED':
        return colors.primary;
        break;

      default:
        return colors.rejectRed;

        break;
    }
  }

  RenderItem = (item) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistItem}>
        <View style={styles.leftContainer}>
          {/* img */}
          <Avatar.Text
            size={48}
            color={colors.white}
            label={item.blood_group}
            style={{backgroundColor: colors.primary}}
            labelStyle={{
              fontSize: 24,
            }}
          />
        </View>
        <View style={styles.RightContainer}>
          <Text
            style={{
              fontFamily: 'HelveticaNowDisplay-Regular',
              fontSize: 12,
            }}>
            {'Date: ' + item.created_date}
          </Text>
          <Text
            style={{
              fontFamily: 'HelveticaNowDisplay-Regular',
              fontSize: 12,
            }}>
            {'Address: ' + item.address}
          </Text>
          <Text
            style={{
              fontFamily: 'HelveticaNowDisplay-Regular',
              fontSize: 12,
            }}>
            {'Phone: ' + item.phone_no}
          </Text>
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}></View>
        </View>
        <View style={styles.LastContainer}>
          <View
            style={{
              backgroundColor: this.getStatusColor({status: item.status}),
              width: '75%',
              height: '25%',
              justifyContent: 'center',
              paddingLeft: h('1%'),
              // borderRadius: h('10%'),
              marginTop: h('3%'),

              borderTopLeftRadius: h('10%'),
              borderBottomLeftRadius: h('10%'),
            }}>
            <Text style={styles.requestTxt}>{item.status}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'space-around',
              margin: 12,
              justifyContent: 'space-between',
              alignItems: 'stretch',
              alignSelf: 'stretch',
            }}>
            <TouchableOpacity
              style={{elevation: 5, alignItems: 'center'}}
              onPress={() => this.deleteRequest(item)}>
              <AntDesign name="closecircle" color={colors.primary} size={24} />
              <Text style={styles.labelText}>Delete</Text>
            </TouchableOpacity>
            {item.status != 'COMPLETE' ? (
              <TouchableOpacity
                style={{
                  elevation: 5,
                  alignItems: 'center',
                }}
                onPress={() => this.completeRequest(item)}>
                <AntDesign
                  name="checkcircle"
                  color={colors.acceptGreen}
                  size={24}
                />
                <Text style={styles.labelText}>Complete</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
  //  <RegularText label={item.doctor} />
  //                   <LabelText label={item.doctorDepartment} />
  //                   <LabelText label={item.appointmentDate} />
  //                   <LabelText label={item.createdBy} />
  //                   <LabelText label={item.startTime} />
  //                   <LabelText label={item.appointmentStatus} />

  deleteRequest = (item) => {
    console.log(JSON.stringify(item));
    var deleteRequestBody = {
      request_id: item.request_id,
      user_id: item.user_id,
    };

    Alert.alert(
      'Delete Blood Request',
      'Are you sure you want to delete this request ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            this.props.actions.deleteBloodRequest({
              accessToken: this.props.access_token,
              deleteRequestBody: deleteRequestBody,
              onSuccess: () => {
                // this.toggleLogin(false);
                // this.props.navigation.replace('BottomTab');
                this.fetchUserRequestList();
              },
              onFailure: () => {
                //Alert error message
                // this.setState({
                //   modalVisible: false,
                // });
              },
            }),
        },
      ],
    );
  };

  completeRequest = (item) => {
    var completeRequestBody = {
      request_id: item.request_id,
      user_id: item.user_id,
    };
    Alert.alert(
      'Complete Blood Request',
      'Are you sure you want to complete this request ? ',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            this.props.actions.completeBloodRequest({
              accessToken: this.props.access_token,
              completeRequestBody: completeRequestBody,
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
            }),
        },
      ],
    );
  };

  render() {
    return (
      <View style={styles.Container}>
        <ImageBackground
          source={require('../../assets/dash.png')}
          style={styles.ImageBackground}>
          <Text style={styles.imgtxt}>Requests made</Text>
          <View style={styles.newRequest}>
            <View style={styles.left}>
              <Text style={styles.no}>{this.props.mybloodrequest.length}</Text>
              <Text style={styles.Requst}>No of Request</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddRequest');
                }}
                style={styles.btn}>
                <AntDesign name="pluscircleo" color={'#ea5455'} size={20} />
                <Text style={styles.btntxt}>Add Request</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* flat */}
        </ImageBackground>
        <View style={styles.flatlistContainerView}>
          <AnimatedFlatList
            contentContainerStyle={{marginTop: -h('2%')}}
            data={this.props.mybloodrequest}
            renderItem={({item}) => this.RenderItem(item)}
            animationType={AnimationType.SlideFromRight}
            keyExtractor={(item) => item.request_id}
            animationDuration={1000}
            focused={true}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mybloodrequest: state.dataReducer.userRequest,
    userData: state.loginReducer.loginResponse['user'],
    access_token: state.loginReducer.loginResponse['token'],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetcheduserrequestlist,
        deleteBloodRequest,
        completeBloodRequest,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequest);
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
    fontSize: h('1.8%'),
    marginLeft: h('1%'),
    fontFamily: 'HelveticaNowDisplay-Regular',
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
  },
  flatlistContainer: {
    alignItems: 'center',
    marginTop: h('2%'),
  },
  flatlistContainerView: {
    backgroundColor: '#E6DDDD',
    height: '100%',
    flex: 1,
    paddingTop: h('2%'),
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
    justifyContent: 'center',
  },
  imgcontainer: {
    backgroundColor: '#ea5455',
    borderRadius: h('100%'),
    width: '80%',
    height: '70%',
  },
  LastContainer: {
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
    fontSize: h('1.2%'),

    fontFamily: 'HelveticaNowDisplay-ExtraBold',
  },
  frespace: {
    backgroundColor: 'white',
    width: '100%',
    height: h('35.1%'),
    // marginTop: -h('50%'),
  },
  labelText: {
    fontFamily: 'HelveticaNowDisplay-Regular',
    fontSize: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
