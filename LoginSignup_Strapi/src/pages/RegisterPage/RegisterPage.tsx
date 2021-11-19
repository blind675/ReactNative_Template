import React, {useRef} from 'react';
import {Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button} from '../../components';
import {MainPagesParams, PagesTypes} from '../../types/routes';
import Styles from './Register.styles';
import {useMutation} from 'react-query';
import {UserRegisterData, UserResponse} from '../../types/user';
import {Error} from '../../types/api';
import apiCalls from '../../services/api';
import {Storage} from '../../services/storage';

export default function RegisterPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MainPagesParams, PagesTypes.Register>>();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const userRegisterVerificationSchema = yup.object().shape({
    userName: yup.string().required('Username is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Please enter a valid password').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const {
    isLoading,
    error: loginError,
    mutate: userRegisterAsync,
  } = useMutation<UserResponse, Error, UserRegisterData>(
    async userRegisterData => {
      return await apiCalls.mutations.registerUser(userRegisterData);
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
      <Formik
        validationSchema={userRegisterVerificationSchema}
        initialValues={{
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async ({userName, email, password}) => {
          console.log('email', email);
          console.log('password', password);
          console.log('userName', userName);

          userRegisterAsync({username: userName, email, password});
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => {
          return (
            <>
              <TextInput
                style={Styles.inputContainer}
                placeholder="User name"
                returnKeyType="next"
                value={values.userName}
                clearButtonMode="while-editing"
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                onSubmitEditing={() => {
                  emailInputRef.current && emailInputRef.current.focus();
                }}
              />
              <TextInput
                ref={emailInputRef}
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
                returnKeyType="next"
                value={values.password}
                clearButtonMode="while-editing"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus();
                }}
              />
              <TextInput
                ref={confirmPasswordInputRef}
                style={Styles.inputContainer}
                placeholder="Confirm Password"
                returnKeyType="done"
                value={values.confirmPassword}
                clearButtonMode="while-editing"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              {(errors || loginError) && (
                <Text style={Styles.errorText}>
                  {errors.userName ||
                    errors.email ||
                    errors.password ||
                    errors.confirmPassword ||
                    loginError?.message[0].messages[0].message}
                </Text>
              )}
              <Button
                disabled={!isValid || isLoading}
                loading={isLoading}
                title="Register"
                onPress={handleSubmit}
                style={Styles.registerButton}
              />
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}
