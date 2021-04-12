import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import theme from '../constants/theme'
import AppText from './AppText';


function AppButton({icon, iconSize, iconColor, title, onPress, style, fontStyle}) {
    return (
        <TouchableOpacity 
            onPress = {onPress} 
            style={[styles.button, style]}
        >
            {icon && <MaterialCommunityIcons name={icon} size={iconSize} color = {iconColor}/>}
            <AppText style={fontStyle}> {title} </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 250,
        borderRadius: 25,
        marginVertical: theme.sizes.margin,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AppButton;