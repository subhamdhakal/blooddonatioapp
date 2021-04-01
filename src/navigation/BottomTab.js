import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import AntDesign from 'react-native-vector-icons/AntDesign';

// screen
import Dashboard from '../screens/dasboard/Dashboard';
import MyRequest from '../screens/request/MyRequest';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EventScreen from './../screens/event/EventScreen';

export class BottomTab extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ea5455"
        inactiveColor="#000"
        barStyle={{backgroundColor: '#fff'}}>
        <Tab.Screen
          name="Feed"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color}) => (
              <AntDesign name="appstore1" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="MyRequest"
          component={MyRequest}
          options={{
            tabBarLabel: 'My Request',
            tabBarIcon: ({color}) => (
              <AntDesign name="mail" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventScreen}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({color}) => (
              <AntDesign name="notification" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color}) => (
              <AntDesign name="user" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
