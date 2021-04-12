import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import theme from '../constants/theme'
import AppText from './AppText';
import AppButton from './AppButton';
import Screen from './Screen'


function AppPicker({icon, iconSize, iconColor, title, selectedItem, onSelectItem, style, fontStyle, data, numColumns, onSwipeLeft }) {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <TouchableOpacity 
                style={[styles.button, style]}
                onPress = {() => setModalVisible(true)}
            >
                {selectedItem ? <MaterialCommunityIcons name={selectedItem.icon} size={iconSize} color = {iconColor}/>: <MaterialCommunityIcons name={icon} size={iconSize} color = {iconColor}/>}    
                {selectedItem ? <AppText style={fontStyle}> {selectedItem.label} </AppText> : <AppText style={fontStyle}> {title} </AppText>}
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <AppButton title={"Close"} onPress={()=> setModalVisible(false)} style={styles.close}/>
                    <FlatList
                        numColumns={numColumns}
                        data={data}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({item}) => 
                            <AppButton
                            onPress={()=> 
                                {setModalVisible(false)
                                onSelectItem(item)}}
                            title={item.label}
                            icon={item.icon}
                            iconSize={30}
                            iconColor={theme.colors.secondary}
                            backgroundColor={item.backgroundColor}
                            style={styles.pickerItem}/>}
                    />

                </Screen>
            </Modal>
        </>
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
    },
    close: {
        height: 40,
        width: 110,
        alignSelf: 'flex-end',
        margin: theme.sizes.margin,
        backgroundColor: theme.colors.light_gray,
    },
    pickerItem: {
        backgroundColor: theme.colors.light_gray,
        width: 110,
        margin: theme.sizes.margin,
    }
})

export default AppPicker;