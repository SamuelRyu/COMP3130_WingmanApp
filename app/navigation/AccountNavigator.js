import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import MoreInformation from '../screens/MoreInformation';
import Account from '../screens/Account';


const AppStack = createStackNavigator ();

const AccountNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Account" component={Account} options={{headerShown:false}}/>
        <AppStack.Screen name="MoreInformation" component={MoreInformation} options={{headerShown:false}}/>
    </AppStack.Navigator>
)

export default AccountNavigator;