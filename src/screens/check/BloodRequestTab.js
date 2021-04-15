import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Portal, Text, Button, Provider, Avatar} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import colors from '../../assets/colors/colors';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CancelAppointmentModal from '../../components/CancelAppointmentModal';
import SelectPaymentOptionModal from '../../components/SelectPaymentOptionModal';
import {getPaymentDetail} from './../../actions/patientpayment';
import {setStatusWaiting} from './../../actions/patient/appointment';
function getStatusColor(status) {
  switch (status) {
    case 'PENDING':
      return colors.pendingYellow;
      break;
    case 'COMPLETED':
      return colors.acceptGreen;
      break;
    case 'MISSED':
      return colors.rejectRed;
      break;
    case 'ACCEPTED':
      return colors.acceptGreen;
      break;
    case 'RESCHEDULED':
      return colors.pendingYellow;
      break;
    case 'CONFIRMED':
      return colors.acceptGreen;
      break;
    case 'WAITING':
      return colors.accentBlue;
      break;
    default:
      return colors.rejectRed;

      break;
  }
}
class UpComingAppointmentTabScreen extends Component {
  state = {
    deleteModal: false,
    paymentModal: false,
    appointmentId: 'kanskx',
    paymentData: {},
  };
  constructor(props) {
    super(props);
    this.dismissCancelModal = this.dismissCancelAppointmentModal.bind(this);
  }
  dismissCancelAppointmentModal() {
    this.setState({
      deleteModal: false,
      paymentModal: false,
    });
  }

  getPatientPaymentDetails(id) {
    this.setState({
      appointmentId: id,
    });
    this.props.actions.getPaymentDetail({
      accessToken: this.props.accessToken,
      appointmentId: id,
      onSuccess: ({paymentData}) => {
        console.log('Payment data ' + paymentData);
        this.setState({
          paymentModal: true,
          paymentData: paymentData,
        });
      },
      onFailure: () => {
        //Alert error message
      },
    });
  }
  setStatusWaiting = (id) => {
    this.props.actions.setStatusWaiting({
      accessToken: this.props.accessToken,
      appointmentId: id,
      onSuccess: () => {},
      onFailure: ({msg}) => {
        //Alert error message
        alert(msg);
      },
    });
  };
  render() {
    return (
      <View
        {...this.props}
        style={{
          paddingBottom: 12,
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <Provider>
          <Portal>
            <CancelAppointmentModal
              visible={this.state.deleteModal}
              appointmentId={this.state.appointmentId}
              dismissCancelModal={() => this.dismissCancelModal()}
            />
          </Portal>
          <Portal>
            <SelectPaymentOptionModal
              visible={this.state.paymentModal}
              appointmentId={this.state.appointmentId}
              dismissCancelModal={() => this.dismissCancelModal()}
              paymentData={this.state.paymentData}
            />
          </Portal>

          <FlatList
            data={this.props.data}
            renderItem={({item, index}) => {
              return (
                <View style={styles.flatlistContainer}>
                  <View style={styles.flatlistItem}>
                    <View style={styles.leftContainer}>
                      <Avatar.Image
                        size={52}
                        source={{
                          uri:
                            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        }}
                      />
                    </View>
                    <View style={styles.RightContainer}>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNowDisplay-Regular',
                          fontSize: 12,
                          color: colors.accentBlue,
                        }}>
                        {'Doctor: ' + item.doctor}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNowDisplay-Regular',
                          fontSize: 12,
                          color: colors.accentBlue,
                        }}>
                        {'Department: ' + item.doctorDepartment}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNowDisplay-Regular',
                          fontSize: 12,
                          color: colors.accentBlue,
                        }}>
                        {'Appointment Date: ' + item.appointmentDate}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNowDisplay-Regular',
                          fontSize: 12,
                          color: colors.accentBlue,
                        }}>
                        {'Start Time: ' + item.startTime}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNowDisplay-Regular',
                          fontSize: 12,
                          color: colors.accentBlue,
                        }}>
                        {'Title: ' + item.subject}
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
                          backgroundColor: getStatusColor(
                            item.appointmentStatus,
                          ),
                          width: '75%',
                          height: '25%',
                          justifyContent: 'center',
                          paddingLeft: h('1%'),
                          // borderRadius: h('10%'),
                          marginTop: h('3%'),

                          borderTopLeftRadius: h('10%'),
                          borderBottomLeftRadius: h('10%'),
                        }}>
                        <Text style={styles.requestTxt}>
                          {item.appointmentStatus}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          alignContent: 'flex-end',
                          margin: 12,
                          justifyContent: 'space-between',
                          alignItems: 'stretch',
                          alignSelf: 'stretch',
                        }}>
                        {item.appointmentStatus === 'PENDING' ? (
                          <TouchableOpacity
                            style={{
                              elevation: 5,
                              alignItems: 'center',
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() =>
                              this.getPatientPaymentDetails(item.id)
                            }>
                            <MaterialCommunityIcons
                              name="cash"
                              color={colors.acceptGreen}
                              size={24}
                            />
                            <Text style={styles.labelText}>Complete</Text>
                          </TouchableOpacity>
                        ) : null}
                        {item.appointmentStatus != 'CONFIRMED' ? null : (
                          <TouchableOpacity
                            style={{elevation: 5}}
                            onPress={() => this.setStatusWaiting(item.id)}>
                            <MaterialCommunityIcons
                              name="timer-sand-empty"
                              color={colors.pendingYellow}
                              size={24}
                            />
                          </TouchableOpacity>
                        )}
                        {item.appointmentStatus === 'COMPLETED' ||
                        item.appointmentStatus === 'CANCELLED' ||
                        item.appointmentStatus === 'CONFIRMED' ? null : (
                          <TouchableOpacity
                            style={{elevation: 5}}
                            onPress={() =>
                              this.setState({
                                deleteModal: true,
                                appointmentId: item.id,
                              })
                            }>
                            <MaterialCommunityIcons
                              name="delete-outline"
                              color={colors.rejectRed}
                              size={24}
                            />
                            <Text style={styles.labelText}>Delete</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </Provider>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendedDoctorList: state.patientDashBoardReducer.recommendedDoctorList,
    accessToken: state.loginReducer.accessToken,
    patientDashboardData: state.patientDashBoardReducer.patientDashboardData,
    profile: state.patientDashBoardReducer.profile,
    profileData: state.patientDashBoardReducer.profile,

    loading: state.patientDashBoardReducer.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getPaymentDetail, setStatusWaiting}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpComingAppointmentTabScreen);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
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
    elevation: 5,
  },
  flatlistContainer: {
    alignItems: 'center',
    marginTop: h('2%'),
    flex: 1,
    marginBottom: 8,
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
    fontSize: h('1.1%'),
    alignSelf: 'flex-end',
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
    paddingRight: 4,
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
  },
});
