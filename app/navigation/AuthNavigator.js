import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Account from '../screens/Account';
import TabNavigator from '../navigation/TabNavigator';


const AppStack = createStackNavigator ();

const AuthNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
        <AppStack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <AppStack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <AppStack.Screen name="Account" component={TabNavigator} options={{headerShown:false}}/>
    </AppStack.Navigator>
)

export default AuthNavigator;