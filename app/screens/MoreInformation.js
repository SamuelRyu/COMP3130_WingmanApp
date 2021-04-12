import React from 'react';

import { StyleSheet, ImageBackground, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import theme from '../constants/theme';


function MoreInformation({navigation, route}) {
    const location = route.params.params.item;
    return (
        <Screen>
            <ImageBackground source={location.image} style={styles.top}>
                <AppButton icon={"chevron-left"} iconSize={20} iconColor={theme.colors.dark_gray} title={"Back"} style={styles.back} onPress={() => navigation.navigate("Travel")}/>
            </ImageBackground>
            <View style={styles.bottom}>
                <AppText style={styles.title}>{location.title}</AppText>
                <AppText style={styles.description}>{location.description}</AppText>

            </View>
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    top: {
        height: 250,
        width: "100%",
    },
    back: {
        height: 40,
        width: 110,
        backgroundColor: theme.colors.light_gray,
        marginLeft: theme.sizes.margin,
        flexDirection:"row",
    },
    bottom: {
        padding: 20,
    },
    title:{
        fontSize: theme.fonts.font_large,
        marginBottom: theme.sizes.margin,
    }
    
})

export default MoreInformation;