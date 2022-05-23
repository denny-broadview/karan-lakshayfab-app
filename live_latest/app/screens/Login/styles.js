import {
    ApplicationStyles,
    Colors,
    Fonts,
} from '@resources';

import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import colors from '../../Resources/Colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.rgb_e15517,
  },
  rootContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "transparent",
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 50 : 50,
  },

  signin: {
    ...Fonts.style.bold_20,
    color: "white",
    marginTop: 50,
    alignSelf: "center",
  },

  parentView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 50,
    marginHorizontal: 30,
    padding: 20,
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 200 : 0,
  },
  textInputParent: {
    borderWidth: 2,
    borderColor: Colors.rgb_e15517,
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    marginTop: 30,
  },
  email: {
    borderColor: Colors.rgb_e15517,
    borderWidth: 1,
    borderRadius: 3,
    // backgroundColor:'yellow',

    //  width: '100%',
    // height:40,
    marginTop: 20,
    paddingVertical: Platform.OS == "ios" ? 5 : 0,
  },
  textInputStyle: {
    width: window.width / 2 + window.width / 12,
  },
  forgotPasswordTextStyle: {
    ...Fonts.style.semiBold_16,
    color: Colors.rgb_e15517,
    marginTop: 30,
  },

  shadowView: {},
  buttonStyle: {
    backgroundColor: colors.rgb_e15517,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  buttonText: {
      ...Fonts.semiBold_16,
      color: colors.rgb_fffaf2
  }
});

export default styles;
