import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Account from '../screens/Account';
import Travel from '../screens/Travel';
import theme from '../constants/theme';
import TravelNavigator from './TravelNavigator';
import AccountNavigator from './AccountNavigator';


const AppTab = createBottomTabNavigator();

const TabNavigator = () => (
    <AppTab.Navigator tabBarOptions={{activeTintColor: theme.colors.primary, inactiveTintColor: theme.colors.tertiary}}>
        <AppTab.Screen 
            name="Account" 
            component={AccountNavigator}
            options={{
                tabBarIcon: ({focused}) => <MaterialCommunityIcons name={"account"} size={35} color={focused?theme.colors.primary:theme.colors.tertiary}/>  }}/>
        <AppTab.Screen 
            name="Travel"
            component={TravelNavigator}
            options={{
                tabBarIcon: ({focused}) => <MaterialCommunityIcons name={"briefcase"} size={30} color={focused?theme.colors.primary:theme.colors.tertiary}/>}}/>
    </AppTab.Navigator>
)

export default TabNavigator;