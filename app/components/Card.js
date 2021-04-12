import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import {MaterialCommunityIcons} from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import AppText from './AppText';
import theme from '../constants/theme';

function Card({source, icon, title, border, onPress, onSwipeLeft}) {
    return (
        <Swipeable renderRightActions={onSwipeLeft}>
            <TouchableOpacity style={[styles.container, border]} onPress={onPress}>
                <Image source={source} style={[styles.image, border]}/>
                <View style={styles.bottom}>
                    <MaterialCommunityIcons name={icon} size={25} color={theme.colors.dark_gray}/>
                    <AppText> {title} </AppText>
                </View>
            </TouchableOpacity>
        </Swipeable>
        
    );
}

const styles = StyleSheet.create({
    container:{
        height: 200,
        width: Dimensions.get('window').length,
        backgroundColor: theme.colors.white,
        elevation: 10,
        marginHorizontal: theme.sizes.margin*2,
        marginVertical: theme.sizes.margin
    },
    image: {
        height: 150,
        width: "100%",
    },
    bottom: {
        height: 50,
        paddingHorizontal: theme.sizes.padding,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Card;