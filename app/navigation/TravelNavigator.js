import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import AddPlace from '../screens/AddPlace';
import Travel from '../screens/Travel';
import MoreInformation from '../screens/MoreInformation';


const AppStack = createStackNavigator ();

const TravelNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Travel" component={Travel} options={{headerShown:false}}/>
        <AppStack.Screen name="AddPlace" component={AddPlace} options={{headerShown:false}}/>
        <AppStack.Screen name="MoreInformation" component={MoreInformation} options={{headerShown:false}}/>
    </AppStack.Navigator>
)

export default TravelNavigator;