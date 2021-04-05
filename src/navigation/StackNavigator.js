import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// screens
import {WelcomeScreen} from '../screens/welcome';

import {SplitScreen} from '../screens/split';
import {OnboardingScreen} from '../screens/onboarding';
import Dashboard from '../screens/dasboard/Dashboard';
import Donarscreen from '../screens/donar/Donarscreen';
import CheckRequest from '../screens/check/CheckRequest';
import AddRequest from '../screens/addrequest/AddRequest';

// navigators
import {BottomTab} from './BottomTab';
import Signin from './../screens/signin/Signin';
import Signup from './../screens/signup/Signup';
import SendPersonalRequest from '../screens/request/SendPersonalRequest';
import EditProfile from '../screens/profile/EditProfile';
import ChangePassword from './../screens/profile/ChangePassword';

export class StackNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplitScreen"
            component={SplitScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Donarscreen"
            component={Donarscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CheckRequest"
            component={CheckRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddRequest"
            component={AddRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
