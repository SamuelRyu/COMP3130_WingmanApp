import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton'
import theme from '../constants/theme';

function Welcome({navigation}) {
    return (
        <Screen style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/logo.png')} style = {styles.logo}/>
                <AppText style={styles.title}>Wingman</AppText>
            </View>
            <View style={styles.bottom}>
                <AppButton 
                    title={"Sign In"} 
                    style={styles.button} fontStyle={styles.buttonText}
                    onPress={() => navigation.navigate("Login")}/>
                <AppButton 
                    title={"Create an Account"}
                    style={styles.button}
                    fontStyle={styles.buttonText}
                    onPress={() => navigation.navigate("Register")}/>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        height: 275,
        width: 275,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: theme.colors.tertiary,
    },
    title: {
        fontSize: theme.fonts.font_header,
        color: theme.colors.tertiary,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.primary,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.fonts.font_normal,
    }
})

export default Welcome;