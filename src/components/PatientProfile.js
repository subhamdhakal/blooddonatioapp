/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import colors from './../../assets/colors/colors';
import HeadLineText from '../../components/HeadlineText';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import LabelText from '../../components/LabelText';
import Header from './../../components/Header';

class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      fullName: this.props.profileData['fullName'],
      dateOfBirth: '',
      age: '',
      sex: '',
      Address: this.props.profileData['address'],
      email: this.props.profileData['email'],
      phoneNumber: this.props.profileData['phoneNumber'],
    };
  }
  render() {
    return (
      <View style={styles.drawerContent}>
        <Header label={'My Profile'} />
        <View style={styles.userInfoSection}>
          <Avatar.Image
            style={{marginTop: 8}}
            source={{
              uri: this.props.profileData['photo'],
            }}
            size={100}
          />
          <Title style={styles.title}>
            {this.props.profileData['fullName']}
          </Title>
          <Caption style={styles.captionStatus}>
            {this.props.profileData['email']}
          </Caption>
          <Caption style={styles.caption}>
            {this.props.profileData['phoneNumber']}
          </Caption>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            alignItems: 'center',
            paddingTop: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="account-outline"
                color={colors.primaryBlue}
                size={24}
                style={{margin: 8}}
              />
              <HeadLineText label={'Personal Details'} />
            </View>
            {this.state.isEditing ? (
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 5,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({isEditing: false})}>
                  <View>
                    <MaterialCommunityIcons
                      name="content-save-outline"
                      color={colors.primaryBlue}
                      size={24}
                      style={{margin: 8, alignSelf: 'flex-end'}}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 5,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({isEditing: true})}>
                  <View>
                    <MaterialCommunityIcons
                      name="pencil"
                      color={colors.primaryBlue}
                      size={24}
                      style={{margin: 8, alignSelf: 'flex-end'}}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
          <View
            style={{
              borderRadius: 25,
              padding: 6,
              width: '90%',
              padding: 16,
              margin: 16,
              backgroundColor: colors.white,
              elevation: 5,
            }}>
            <TouchableWithoutFeedback
              style={{
                alignItems: 'flex-start',
                borderRadius: 25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Full Name:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.fullName}
                  autoFocus
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({fullName: value})}
                />
              </View>
              {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <LabelText label="Last Name:" />
              <TextInput
                style={styles.textInputStyles}
                value={this.state.LastName}
                editable={this.state.isEditing}
                onChangeText={(value) => this.setState({LastName: value})}
              />
            </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Date of Birth:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.dateOfBirth}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({dateOfBirth: value})}
                />
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Age:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.age}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({age: value})}
                />
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Sex:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.sex}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({sex: value})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Address:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.Address}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({Address: value})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Email:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.email}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({email: value})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LabelText label="Phone Number:" />
                <TextInput
                  style={styles.textInputStyles}
                  value={this.state.phoneNumber}
                  editable={this.state.isEditing}
                  onChangeText={(value) => this.setState({phoneNumber: value})}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  color={colors.primaryBlue}
                  size={24}
                  style={{margin: 8}}
                />
                <HeadLineText label={'Change Password'} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{marginTop: 18}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="logout"
                  color={colors.primaryBlue}
                  size={24}
                  style={{margin: 8}}
                />
                <HeadLineText label={'Log Out'} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profileData: state.patientDashBoardReducer.profile,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
  userInfoSection: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  caption: {
    fontSize: 15,
    lineHeight: 14,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: colors.white,
  },
  captionStatus: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.white,
    fontFamily: 'HelveticaNowDisplay-ExtraBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textInputStyles: {
    backgroundColor: '#fff',
    color: colors.primaryBlue,
    marginLeft: 12,
    width: '70%',
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Medium',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
