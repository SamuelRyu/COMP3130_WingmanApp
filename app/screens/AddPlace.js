import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Image, View, ScrollView, ImageComponent } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import theme from '../constants/theme';


import * as ImagePicker from 'expo-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DataManager from '../constants/DataManager';
import AppPicker from '../components/AppPicker';

const schema = Yup.object().shape(
    {
        title: Yup.string().required().label("Place Name"),
        description: Yup.string().required().min(10).label("Description"),
        image: Yup.string().required().nullable().label("Image"),
        category: Yup.string().required().label("Category")
    }
);

const categories = [
    {label: "Food", value: 1, icon: "food-fork-drink"},
    {label: "Places to Stay", value: 2, icon: "bed"},
    {label: "Activities", value: 3, icon: "hiking"},
]


const submitForm = (values) => {
    let commonData = DataManager.getInstance();
    const locations = commonData.getLocations();
    const userID = commonData.getUserID();

    const id = locations.length+1;
    const icon = categories.find((item) => item.label === values.category).icon

    const newLocation = {
        id: id,
        title: values.title,
        description: values.description,
        image: {uri: values.image},
        category: values.category,
        icon: icon,
        userID: userID,
    }

    commonData.addLocation(newLocation);
};


function AddPlace({navigation}) {

    const [category, setCategory] = useState(null)

    let openImagePickerAsync = async (handleChange) => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false){
            alert("Permission to access camera required.");
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true){
            return;
        }
    
        handleChange(pickerResult.uri);

    }
    return (
        
        <Screen style={styles.container}>
            <Formik
                initialValues={{title:'', description:'', image: null, category: ''}}
                validationSchema={schema}

                onSubmit={(values, {resetForm}) => 
                    {submitForm(values);
                    resetForm();
                    navigation.navigate("Travel");
                }         
                }
            >
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue}) => (
                    <ScrollView>
                    <View style={styles.top}>
                        <AppButton icon={"chevron-left"} iconSize={20} iconColor={theme.colors.dark_gray} title={"Back"} style={styles.back} onPress={() => navigation.navigate("Travel")}/>
                    </View>
                    
                        <View style={styles.bottom}>
                            <AppText style={styles.header}>Add a Place</AppText>
                            <AppTextInput 
                                name={"city"} 
                                size={25} 
                                title={"Place Name"} 
                                placeholder={"Name of Place"}
                                values={values.title}
                                onChangeText={handleChange("title")}
                                onBlur= {() => setFieldTouched("title")}
                                />
                            {touched.title && <AppText style={styles.errorText}>{errors.title}</AppText>}
                            <AppTextInput 
                                title={"Description"} 
                                placeholder={"Add a description."}
                                height={styles.description}
                                textAlignVertical={{textAlignVertical: 'top'}}
                                multiline
                                values={values.description}
                                onChangeText={handleChange("description")}
                                onBlur= {() => setFieldTouched("description")}
                                />
                            {touched.description && <AppText style={styles.errorText}>{errors.description}</AppText>}
                            <View style={styles.pickerContainer}>
                                {values.image && <Image source={{uri: values.image}} style={styles.image}/>}
                                <AppButton 
                                    icon={"upload"} 
                                    iconSize={20} 
                                    iconColor={theme.colors.dark_gray} 
                                    title={"Add Image"} 
                                    style={styles.picker} 
                                    onPress={() => openImagePickerAsync(handleChange("image"))}
                                    />
                            </View>
                            {touched.image && <AppText style={styles.errorText}>{errors.image}</AppText>}
                            <AppPicker icon={"home-city"} 
                                iconSize={20} 
                                iconColor={theme.colors.dark_gray} 
                                title={"Categories"}
                                data={categories}
                                numColumns={3}
                                values={values.category}
                                selectedItem={category}
                                onSelectItem={item =>  {setFieldValue("category", item.label), setCategory(item), setFieldTouched("category")}}
                                style={styles.trips}/>
                             {touched.category && <AppText style={styles.errorText}> {errors.category} </AppText>}
                            <AppButton 
                                    title={"Submit Place"} 
                                    style={styles.submit}
                                    fontStyle={styles.submitText}
                                    onPress={handleSubmit}/>
                        </View>
                    </ScrollView>
                )}
            </Formik>
            
                
            

            
            <View>
            </View>
        </Screen>
    );
}

export default AddPlace;

const styles = StyleSheet.create({
    container: {
    },

    top:{
        backgroundColor: theme.colors.primary,
        height: 60,
    },

    back: {
        height: 40,
        width: 110,
        backgroundColor: theme.colors.light_gray,
        marginLeft: theme.sizes.margin,
        flexDirection:"row",
    },

    bottom: {
        alignItems:'center',
        marginTop: theme.sizes.margin,
    },
    header: {
        fontSize: theme.fonts.font_subheader,
        fontWeight: 'bold',
        color: theme.colors.tertiary,
        textAlign: 'center',
    },
    description: {
        height: 200,
    },
    picker:{
        height: 40,
        width: 110,
        backgroundColor: theme.colors.light_gray,
        marginLeft: theme.sizes.margin,
        flexDirection:"row",
    },
    pickerContainer:{
        marginTop: theme.sizes.margin,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: theme.colors.tertiary,
    },
    submit:{
        backgroundColor: theme.colors.primary,
        
    },
    submitText:{
        color: theme.colors.white
    },
    errorText: {
        color:"red",
        fontSize: theme.fonts.font_small,
    }
})
