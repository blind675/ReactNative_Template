import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Black,
    borderRadius: 1000,
    width: 318,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  noOpacity: {
    opacity: 1,
  },
  transparent: {
    opacity: 0.4,
  },
  title: {
    ...Fonts.h4,
    color: Colors.White,
  },
  loadingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  loadingAnimation: {
    width: 24,
  },
  loadingText: {
    ...Fonts.h4,
    color: Colors.White,
    flex: 1,
    marginRight: 24,
    textAlign: 'center',
  },
});
