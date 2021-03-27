import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// screens
import {WelcomeScreen} from '../screens/welcome';

import {SplitScreen} from '../screens/split';
import {OnboardingScreen} from '../screens/onboarding';
import {Dashboard} from '../screens/dasboard';
import {Donarscreen} from '../screens/donar';
import {CheckReques} from '../screens/check';
import {AddRequest} from '../screens/addrequest';

// navigators
import {BottomTab} from './BottomTab';
import Signin from './../screens/signin/Signin';
import Signup from './../screens/signup/Signup';

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
            name="CheckReques"
            component={CheckReques}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddRequest"
            component={AddRequest}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
