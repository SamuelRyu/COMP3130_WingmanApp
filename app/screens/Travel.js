import React, {useState} from 'react';

import {MaterialCommunityIcons} from '@expo/vector-icons';


import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import theme from '../constants/theme';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import DataManager from '../constants/DataManager';
import AppPicker from '../components/AppPicker';

const categories = [
    {label: "All", value: 0, icon: "home-city"},
    {label: "Food", value: 1, icon: "food-fork-drink"},
    {label: "Places to Stay", value: 2, icon: "bed"},
    {label: "Activities", value: 3, icon: "hiking"},
]

const sorting = [
    {label: "Ascending", value: 0, icon: "sort-alphabetical-ascending"},
    {label: "Descending", value: 0, icon: "sort-alphabetical-descending"}
]

const getLocations = () => {
    let commonData = DataManager.getInstance();
    let locations = commonData.getLocations();
    return locations;
}

function Travel({navigation}) {
    const locations = getLocations();

    const [refreshing, setRefreshing] = useState(false);
    const [category, setCategory] = useState();
    const [sortMode, setSortMode] = useState();
    const [newLocations, setNewLocations] = useState(locations);

    const deleteLocation = (location) => {
        setNewLocations(newLocations.filter(item => item.id !== location.id));
    }

    const changeCategory = (category) => {
        if(category.label === "All"){
            setNewLocations(locations)
        }else{
            setNewLocations(locations.filter(item => item.category === category.label));
        }
    }

    const sortLocations = (sortType) => {
        let sortedLocations = []
        if(sortType.label === "Ascending"){
            sortedLocations = [].concat(newLocations).sort((a,b) => b.title - a.title ? -1 : 1);
        }else{
            sortedLocations = [].concat(newLocations).sort((a,b) => b.title - a.title ? 1 : -1);
        }
        setNewLocations(sortedLocations)
    }

    const performSearch = (text) => {
        let searchedResults = locations.filter((item) => item.title.includes(text))
        
        setNewLocations(searchedResults)
    }

    return (
        <Screen> 
            <FlatList
                ListHeaderComponent = {
                    <>
                        <View style={styles.top}>
                            <AppTextInput
                                placeholder={"Search"}
                                name={"magnify"}
                                size={30}
                                onChangeText={text => performSearch(text)}
                            />
                        </View> 
                        <View style={styles.middle}>
                            <AppPicker icon={"home-city"} 
                                iconSize={20} 
                                iconColor={theme.colors.dark_gray} 
                                title={"Categories"}
                                data={categories}
                                numColumns={3}
                                selectedItem={category}
                                onSelectItem={item =>  {setCategory(item), changeCategory(item)}}
                                style={styles.trips}/>
                            <AppPicker icon={"sort"} 
                                iconSize={20} 
                                iconColor={theme.colors.dark_gray} 
                                title={"Sort"}
                                data={sorting}
                                numColumns={2}
                                selectedItem={sortMode}
                                onSelectItem={item => {setSortMode(item), sortLocations(item)}}
                                style={styles.trips}/>
                            <AppButton icon={"plus"}
                                iconSize={20} 
                                iconColor={theme.colors.dark_gray} 
                                title={"Add Place"}
                                style={styles.trips}
                                onPress={() => navigation.navigate("AddPlace")}
                                />
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
                        onPress={() => {console.log(item); navigation.navigate("MoreInformation", {
                            screen: "MoreInformation",
                            params: {
                                item: item
                            }
                        })}}
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
        height: 80,
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
    deleteContainer:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: theme.sizes.margin
    },
    deleteButton: {
        backgroundColor: theme.colors.secondary, 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default Travel;