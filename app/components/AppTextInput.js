import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../constants/theme';
import AppText from './AppText';


function AppTextInput({name, title, placeholder, size, multiLine, height, textAlignVertical, ...otherProps}) {
    return (
        <View style={styles.container}>
            {title && <AppText style={styles.topText}>{title}</AppText>}
            <View style={[styles.textbox, height]}>
                <MaterialCommunityIcons name={name} size={size} color={theme.colors.dark_gray}/>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.dark_gray}
                    style={[styles.input,textAlignVertical]}
                    {...otherProps}
                />
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    topText: {
        marginLeft: theme.sizes.margin + 5,
    },
    container: {
        marginVertical: theme.sizes.margin,
    },
    textbox: {
        height: 35,
        width: 300,
        borderRadius: theme.sizes.radius,
        borderWidth: 0,
        backgroundColor: theme.colors.light_gray,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        paddingRight: 25,
    },
    input:{
        marginLeft: theme.sizes.margin,
        height: '100%',
        width: "100%",
    },
})

export default AppTextInput;
