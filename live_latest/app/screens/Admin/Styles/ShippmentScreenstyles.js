import { StyleSheet,Dimensions } from 'react-native';
import {
  Colors,
  Fonts,
    ApplicationStyles
} from '@resources';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  parentView: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 5,
  },

  itemStyle: {
    ...ApplicationStyles.shadowBoxCard.container,
    backgroundColor: 'white',
    marginHorizontal: 14,
    marginVertical: 7,
  },
  orderNoView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    justifyContent: 'space-between'
  },

  oderNoLabelStyle: {
    ...Fonts.style.semiBold_14,
    color: Colors.rgb_e15517,

  },
  oderNoTextStyle: {
    ...Fonts.style.regular_14,
    color: Colors.rgb_000000,
  },
  childItemsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  titleView: {
    alignSelf: 'center',
    flex: 1,
    ...Fonts.style.semiBold_12,
    color: Colors.rgb_000000,
  },
  valueView: {
    alignSelf: 'center',
    flex: 2.2,
    ...Fonts.style.bold_12,
    color: Colors.rgb_000000,
  },
  detailsView:{
    alignSelf:'flex-end',
    margin: 15,
    paddingHorizontal:30,
    paddingVertical: 5,
    borderWidth:1,
    borderColor:Colors.rgb_e15517,
    borderRadius:5

  },
  detailsTextStyle:{
    alignSelf: 'center',
    ...Fonts.style.semiBold_16,
    color: Colors.rgb_e15517,
  },
  addressStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    //padding: 5,
  },
  acceptRejectStyle: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 0,
    backgroundColor: Colors.rgb_f7f7f7,
    marginBottom: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,

  },
  acceptRejectTouchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    // backgroundColor:'red',
    flex: 1,
  },
  acceptRejectTextStyle: {
    textAlign: 'center',
    //    marginHorizontal: 8,
  },
});

export default styles;
