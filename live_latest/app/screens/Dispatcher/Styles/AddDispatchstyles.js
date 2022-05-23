import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Colors,
  Fonts,
  ApplicationStyles
} from '@resources';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flex:1,
     backgroundColor:'white'
  },
  rootContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'transparent',
    width: null,
    height: null,
  },
  container: {
    flex: 1,
   marginBottom: Platform.OS === 'ios' ? 50 : 50,
  },

  signin: {
    ...Fonts.style.bold_20,
    color: 'white',
    marginTop: 50,
    alignSelf: 'center',
  },

  parentView: {

    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 50,
    marginHorizontal: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 200 : 0,
  },
  textInputParent: {
    borderWidth: 2,
    borderColor: Colors.rgb_e15517,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    marginTop: 30,
  },
  email: {
    borderColor: Colors.rgb_e15517,
    borderWidth: 1,
    borderRadius: 3,
     width: '100%',
     height:40,
     marginTop: 20,
  },
  textInputStyle: {
    marginLeft:10,
    ...Fonts.regular_12,
    color: Colors.rgb_030102,
    //backgroundColor:'red'



  },
  forgotPasswordTextStyle: {
    ...Fonts.semiBold_14,
    color: Colors.rgb_e15517,
    marginTop: 30,
  },

  shadowView:{

  },
  textInputParentStyle: {
   // ...ApplicationStyles.shadowBoxCard.container,
    marginHorizontal:14,
    // marginVertical:7,
    borderRadius: 5,
    backgroundColor: Colors.rgb_f9f9f9,
    borderWidth: 2,
    borderColor: Colors.rgb_e15517,
    flexDirection: 'row',
    //width: '100%',
    height: 50,
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal:10,

  },



});

export default styles;
