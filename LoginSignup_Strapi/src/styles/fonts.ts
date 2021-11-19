import {StyleSheet} from 'react-native';

const FontSizes = {
  h1: 24,
  h4: 18,
  normal: 14,
};

export const Fonts = StyleSheet.create({
  // TODO: Add more font styles
  h1: {
    fontSize: FontSizes.h1,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: FontSizes.h4,
    fontWeight: '500',
  },
  normal: {
    fontSize: FontSizes.normal,
    fontWeight: '400',
  },
});
