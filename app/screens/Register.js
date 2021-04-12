import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Screen from '../components/Screen';

import theme from '../constants/theme';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

import AppText from '../components/AppText';
import DataManager from '../constants/DataManager';

const schema = Yup.object().shape(
    {
        email: Yup.string().required().email().label("Email"),
        username: Yup.string().required().label("Username"),
        password: Yup.string().required().min(4).label("Password"),
        repeatPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label("Repeat Password")
    }
);

const addUser = (values) => {
    let commonData = DataManager.getInstance()
    
    const users = commonData.getUsers();
    const userID = users.length+1;
    const newUser = {
        id: userID,
        username: values.username,
        email: values.email,
        password: values.password,
        profilePicture: null,
    }

    commonData.addUser(newUser);

    console.log(commonData.getUsers());
}

function Register({navigation}) {
    return (
        <Screen style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/logo.png')} style = {styles.logo}/>
                <AppText style={styles.title}>Create an Account</AppText>
            </View>

            <Formik
                initialValues={{email: '',username: '', password: '', repeatPassword: ''}}
                validationSchema={schema}
                onSubmit={(values, {resetForm}) => {
                    addUser(values);
                    resetForm();
                    navigation.navigate("Login");
                }}
            >
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <View style={styles.middle}>
                            <AppTextInput 
                                name={"email"} 
                                placeholder={"Email"} 
                                size={20} 
                                title={"Email"}
                                values={values.email}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                
                                onChangeText={handleChange("email")}
                                onBlur={()=>setFieldTouched("email")}
                            />
                            {touched.email && <AppText style={styles.errorText}>{errors.email}</AppText>}
                            <AppTextInput 
                                name={"account"} 
                                placeholder={"Username"} 
                                size={20} 
                                title = {"Username"}
                                values={values.username}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange("username")}
                                onBlur={()=>setFieldTouched("username")}
                                />
                            {touched.username && <AppText style={styles.errorText}>{errors.username}</AppText>}
                            <AppTextInput 
                                name={"form-textbox-password"} 
                                placeholder={"Password"} 
                                size={20} 
                                title = {"Password"}
                                values={values.password}
                                secureTextEntry
                                textContentType="password"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={handleChange("password")}
                                onBlur={()=>setFieldTouched("password")}
                                />
                            {touched.password && <AppText style={styles.errorText}>{errors.password}</AppText>}
                            <AppTextInput 
                                name={"form-textbox-password"} 
                                placeholder={"Repeat Password"} 
                                size={20} 
                                title = {"Repeat Password"}
                                values={values.repeatPassword}
                                secureTextEntry
                                textContentType="password"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={handleChange("repeatPassword")}
                                onBlur={()=>setFieldTouched("repeatPassword")}
                                />
                            {touched.repeatPassword && <AppText style={styles.errorText}>{errors.repeatPassword}</AppText>}
                        </View>
                        <View style={styles.bottom}>
                            <AppButton 
                                title={"Create Account"}
                                style={styles.button} fontStyle={styles.buttonText}
                                onPress={handleSubmit}/>
                            <AppButton 
                                title={"Sign In"} 
                                style={styles.button} 
                                fontStyle={styles.buttonText}
                                onPress={() => navigation.navigate("Login")}/>
                        </View> 
                    </>
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
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        alignItems: 'center',
    },
    logo:{
        height: 150,
        width: 150,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: theme.colors.tertiary,
    },
    title: {
        fontSize: theme.fonts.font_subheader,
        color: theme.colors.tertiary,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: theme.colors.primary,
    },
    buttonText: {
        color: theme.colors.white,
    },
    errorText: {
        color:"red",
        fontSize: theme.fonts.font_small,
    }
})

export default Register;