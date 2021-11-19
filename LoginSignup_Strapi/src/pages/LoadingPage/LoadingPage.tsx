import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MaterialIndicator} from 'react-native-indicators';
import {Storage} from '../../services/storage';
import Styles from './LoadingPage.styles';
import {MainPagesParams, PagesTypes} from '../../types/routes';
import {Colors} from '../../styles';
import {useQuery} from 'react-query';
import apiCalls from '../../services/api';

export default function LoadingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MainPagesParams, PagesTypes.Loading>>();

  const {
    isFetched: userDataFetched,
    data: user,
    error: userError,
  } = useQuery('user', apiCalls.queries.getUser, {retry: false});

  // TODO: Do another query that depends on the users success response
  // // Then get the user's projects
  // const {data, error} = useQuery('someOtherData', otherQuery, {
  //   // The query will not execute until the userId exists
  //   enabled: !!user,
  // });

  useEffect(() => {
    if (userDataFetched) {
      // If there is an error with the user query
      // there is either no token, or an expired one
      if (userError) {
        // clear storage just to be sure
        Storage.clear();
        navigation.navigate(PagesTypes.Login);
      } else {
        navigation.navigate(PagesTypes.Home);
      }
    }
  }, [navigation, userError, userDataFetched]);

  return (
    <View style={Styles.pageContainer}>
      <MaterialIndicator color={Colors.White} size={32} />
    </View>
  );
}
