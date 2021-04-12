import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, ScrollView } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import theme from '../constants/theme';
import AppText from '../components/AppText';
import DataManager from '../constants/DataManager';

const schema = Yup.object().shape(
    {
        user: Yup.string().required().label("Username/Email"),
        password: Yup.string().required().min(4).label("Password"),
    }
);

const validateUser = (values) => {
    const userList = getUsers();

    return userList.filter((user) => (user.username === values.user || user.email === values.user)  && user.password === values.password).length > 0
};

const getUsers = () => {
    let commonData = DataManager.getInstance();
    return commonData.getUsers();
};

const submitUser = (values) => {
    let commonData = DataManager.getInstance();
    const userList = commonData.getUsers();
    let userID = userList.find((user) => (user.username === values.user || user.email === values.user)).id;

    commonData.setUserID(userID);
};


function Login({navigation}) {

    return (
        <Screen style={styles.container}>
            <ImageBackground source={require("../assets/places/logincover.jpg")} style={styles.background}>
                <AppText style={styles.headerText}>Sign In</AppText>
            </ImageBackground>

            <Formik
                initialValues={{user:'', password:'',}}
                validationSchema={schema}

                onSubmit={(values, {resetForm}) => {
                    if (validateUser(values)){
                        resetForm();
                        submitUser(values);
                        navigation.navigate("Account")
                    } else {
                        resetForm();
                        alert("Login not successful");
                    }
                }}
            >
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <ScrollView>
                    <View style={styles.middle}>
                        <AppTextInput 
                            name={"account"} 
                            placeholder={"Username/Email"} 
                            title={"Username/Email"}
                            size={20}
                            value={values.user}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={handleChange("user")}
                            onBlur= {() => setFieldTouched("user")}
                            />
                        {touched.user && <AppText style={styles.errorText}>{errors.user}</AppText>}
                        <AppTextInput 
                            name={"form-textbox-password"} 
                            placeholder={"Password"} 
                            size={20} 
                            title={"Password"}
                            secureTextEntry
                            textContentType="password"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur= {() => setFieldTouched("password")}/>
                        {touched.password && <AppText style={styles.errorText}>{errors.password}</AppText>}
                    </View>
                    <View style={styles.bottom}>
                        <AppButton 
                            title={"Login"} 
                            style={styles.button} 
                            fontStyle={styles.buttonText}
                            onPress={handleSubmit}/>
                        <AppButton 
                            title={"Register"} 
                            style={styles.button} 
                            fontStyle={styles.buttonText}
                            onPress={() => navigation.navigate("Register")}/>
                    </View>
                </ScrollView>
                )}    
            </Formik>

            

        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        alignItems: 'center',
    },
    logo:{
        height: 200,
        width: 200,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: theme.colors.tertiary,
    },
    title: {
        fontSize: theme.fonts.font_subheader,
        color: theme.colors.tertiary,
        fontWeight: 'bold',
    },
    headerText:{
        color: theme.colors.white,
        fontSize: theme.fonts.font_subheader + 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: theme.colors.primary,
    },
    buttonText: {
        color: theme.colors.white,
    },
    background: {
        height: 300,
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: theme.sizes.padding
    },
    errorText: {
        color:"red",
        fontSize: theme.fonts.font_small,
    }
})

export default Login;