import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import theme from '../constants/theme';


function Screen({children, style}){
    return (
        <SafeAreaView style= {[styles.screen, style]}>
            <View style={styles.paddingView}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.white,
    },
    paddingView:{
        flex: 1,
    }
})

export default Screen