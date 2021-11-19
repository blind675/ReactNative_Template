import React from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '../../components';
import {MainPagesParams, PagesTypes} from '../../types/routes';
import Styles from './LoginPage.styles';

export default function LoginPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MainPagesParams, PagesTypes.Login>>();
  return (
    <SafeAreaView style={Styles.pageContainer}>
      <Text style={Styles.pageTitle}>Welcome</Text>
      <TextInput style={Styles.inputContainer} placeholder="Email" />
      <TextInput style={Styles.inputContainer} placeholder="Password" />
      <Button title="Login" onPress={() => {}} style={Styles.loginButton} />
      <TouchableOpacity onPress={() => navigation.navigate(PagesTypes.Register)}>
        <Text style={Styles.registerText}>Register?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
