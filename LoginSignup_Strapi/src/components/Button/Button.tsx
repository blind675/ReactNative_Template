import React from 'react';
import {Text, View, TouchableOpacity, ViewStyle} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors} from '../../styles';
import Styles from './Button.styles';

type ButtonProps = {
  title: string;
  onPress(): void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export const Button = ({disabled, loading, title, style, onPress}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[Styles.container, disabled ? Styles.transparent : Styles.noOpacity, style]}
      onPress={onPress}>
      {loading ? (
        <View style={Styles.loadingContainer}>
          <View style={Styles.loadingAnimation}>
            <MaterialIndicator color={Colors.White} size={24} />
          </View>
          <Text style={Styles.loadingText}>Processing</Text>
        </View>
      ) : (
        <Text style={Styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
