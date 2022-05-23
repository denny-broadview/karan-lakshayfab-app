import { StyleSheet } from 'react-native'
import {
  Colors,
  Fonts,
  ApplicationStyles
} from '@resources'

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
   // paddingHorizontal: 96,
    width:'100%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  minimumItemStyle: {
    ...ApplicationStyles.shadowBoxCard.container,
    flexDirection: 'row',
    marginHorizontal: 14,
    marginVertical: 7,
    paddingHorizontal: 20,
    paddingVertical:10,
    justifyContent: 'space-between',
    backgroundColor: Colors.rgb_e15517,

  },
  subTotalTextPriceStyle:{
    ...Fonts.style.bold_20,
    color: 'white'
  },

})
