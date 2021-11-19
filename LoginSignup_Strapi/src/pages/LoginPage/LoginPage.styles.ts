import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../styles';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  pageTitle: {
    ...Fonts.h1,
    margin: 20,
    textAlign: 'center',
  },
  inputContainer: {
    height: 50,
    ...Fonts.normal,
    marginHorizontal: 32,
    marginTop: 16,
    borderRadius: 8,
    borderColor: Colors.Grey,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  loginButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  registerText: {
    ...Fonts.normal,
    marginTop: 16,
    textAlign: 'center',
    color: Colors.Grey,
  },
  errorText: {
    ...Fonts.normal,
    color: Colors.Red,
    margin: 16,
  },
});
