import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MaterialIndicator} from 'react-native-indicators';
import {Storage} from '../../services/storage';
import Styles from './LoadingPage.styles';
import {MainPagesParams, PagesTypes} from '../../types/routes';
import {Colors} from '../../styles';

export default function LoadingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MainPagesParams, PagesTypes.Loading>>();

  useEffect(() => {
    if (Storage.isTokenSet) {
      //TODO: fetch data from server
      navigation.navigate(PagesTypes.Home);
    } else {
      setTimeout(() => {
        navigation.navigate(PagesTypes.Login);
      }, 2000);
    }
  }, [navigation]);

  return (
    <View style={Styles.pageContainer}>
      <MaterialIndicator color={Colors.White} size={32} />
    </View>
  );
}
