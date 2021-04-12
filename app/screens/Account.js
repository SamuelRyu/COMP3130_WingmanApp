
import React, {useState} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Card from '../components/Card';
import Screen from '../components/Screen';
import DataManager from '../constants/DataManager';
import theme from '../constants/theme';


const getLocations = () => {
    let commonData = DataManager.getInstance();
    let locations = commonData.getLocations();
    return locations;
}
    
const getUserInfo = () => {
    let commonData = DataManager.getInstance();
    const userID = commonData.getUserID();

    console.log(userID)

    return commonData.getUser(userID);
};

function Account({navigation}) {
    const user = getUserInfo();
    let userLetter = user.username.substring(0,1).toUpperCase();
    const locations = getLocations();
    const [refreshing, setRefreshing] = useState(false);
    const [category, setCategory] = useState("");
    const [sortMode, setSortMode] = useState("");
    const [newLocations, setNewLocations] = useState(locations);

    const deleteLocation = (location) => {
        setNewLocations(newLocations.filter(item => item.id !== location.id));
        console.log(location.id)
    }
    return (
        <Screen> 
            <FlatList
                ListHeaderComponent = {
                    <>
                        <View style={styles.top}>
                            <View style={styles.profile}>
                            <AppText style={styles.profileText}>{userLetter}</AppText>
                        </View>
                            <AppText style={styles.name}>{user.username}</AppText>
                            <AppButton 
                                title={"Log Out"} 
                                style={styles.logout}
                                onPress={() => navigation.navigate("Login")}/>
                        </View> 
                        <View style={styles.middle}>
                            <AppButton title={"Saved Trips"} style={styles.trips}/>
                            <AppButton title={"Favourites"} style={styles.trips}/>
                            <AppButton title={"Past Trips"} style={styles.trips}/>
                        </View>
                        <AppText style={styles.tripText}>Saved Trips</AppText>
                    </>
                }
                data = {newLocations}
                refreshing={refreshing}
                onRefresh={()=> setNewLocations(locations)}
                keyExtractor = {location => location.id.toString()}
                ListEmptyComponent = {() => <AppText style={{margin: theme.sizes.margin}}>Seems like its empty... Maybe add a place!</AppText>}
                renderItem = {({item}) => 
                    <Card
                        source={item.image}
                        icon={item.icon}
                        title={item.title}
                        border={{borderRadius: 20}}
                        onPress={() => navigation.navigate("MoreInformation", {
                            screen: "MoreInformation",
                            params: {
                                item: item
                            }
                        })}
                        onSwipeLeft={() => 
                            (<View style={styles.deleteContainer}>
                                <TouchableOpacity style={styles.deleteButton} onPress = {() => deleteLocation(item)}>
                                    <MaterialCommunityIcons name={"trash-can"} size={40} color={theme.colors.light_gray}/>
                                </TouchableOpacity>
                            </View>)}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    top:{
        height: 200,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile:{
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: {
        color: theme.colors.tertiary,
        fontSize: theme.fonts.font_header,
    },
    name: {
        marginTop: 5,
        color: theme.colors.white,
        fontSize: theme.fonts.font_large,

    },
    logout: {
        height: 40,
        width: 100,
        backgroundColor: theme.colors.light_gray,
        marginRight: theme.sizes.margin,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    trips: {
        height: 40,
        width: 110,
        backgroundColor: theme.colors.light_gray,
        marginRight: theme.sizes.margin,
    },
    middle:{
        paddingLeft: theme.sizes.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: theme.sizes.margin,
    },
    tripText: {
        marginVertical: theme.sizes.margin,
        marginLeft: 40,
        fontWeight: 'bold'
    },
})

export default Account;