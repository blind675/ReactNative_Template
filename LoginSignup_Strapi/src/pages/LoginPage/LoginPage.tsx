import React, {useRef} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button} from '../../components';
import {MainPagesParams, PagesTypes} from '../../types/routes';
import Styles from './LoginPage.styles';
import {useMutation} from 'react-query';
import {UserLoginData, UserResponse} from '../../types/user';
import {Error} from '../../types/api';
import apiCalls from '../../services/api';
import {Storage} from '../../services/storage';

export default function LoginPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MainPagesParams, PagesTypes.Login>>();
  const passwordInputRef = useRef<TextInput>(null);

  const userLoginVerificationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Please enter a valid password').required('Password is required'),
  });

  const {
    isLoading,
    error: loginError,
    mutate: userLoginAsync,
  } = useMutation<UserResponse, Error, UserLoginData>(
    async userLoginData => {
      return await apiCalls.mutations.loginUser(userLoginData);
    },
    {
      onSuccess: response => {
        // save token to local storage
        Storage.setToken(response.jwt);
        Storage.setUserRole(response.user.role.type);
        navigation.navigate(PagesTypes.Home);
      },
    },
  );

  return (
    <SafeAreaView style={Styles.pageContainer}>
      <Text style={Styles.pageTitle}>Welcome</Text>
      <Formik
        validationSchema={userLoginVerificationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ({email, password}) => {
          console.log('email', email);
          console.log('password', password);

          userLoginAsync({identifier: email, password});
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => {
          return (
            <>
              <TextInput
                style={Styles.inputContainer}
                placeholder="Email"
                returnKeyType="next"
                value={values.email}
                clearButtonMode="while-editing"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onSubmitEditing={() => {
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
              />
              <TextInput
                ref={passwordInputRef}
                style={Styles.inputContainer}
                placeholder="Password"
                returnKeyType="done"
                value={values.password}
                clearButtonMode="while-editing"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {(errors || loginError) && (
                <Text style={Styles.errorText}>
                  {errors.email || errors.password || loginError?.message[0].messages[0].message}
                </Text>
              )}
              <Button
                disabled={!isValid || isLoading}
                loading={isLoading}
                title="Login"
                onPress={handleSubmit}
                style={Styles.loginButton}
              />
              <TouchableOpacity onPress={() => navigation.navigate(PagesTypes.Register)}>
                <Text style={Styles.registerText}>Register?</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}
