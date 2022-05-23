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

  itemContent:{
    ...ApplicationStyles.shadowBoxCard.container,
    backgroundColor:'white',
    marginHorizontal:14,
    marginVertical:7,
  },

  itemParentView: {
    ...ApplicationStyles.shadowBoxCard.container,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 7,
    elevation: 5,
  },

  itemView: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  orderTextStyle: {
    ...Fonts.style.semiBold_16,
    color: Colors.rgb_e15517,
  },
  amountTextStyle: {
    ...Fonts.style.bold_18,
    color: Colors.rgb_0E0E0E,
  },
  shippingTextStyle: {
    ...Fonts.style.semiBold_16,
    color: Colors.rgb_cccccc,
  },
  shippingDateTextStyle: {
    ...Fonts.style.semiBold_16,
    color: Colors.rgb_0E0E0E,
  },
  shippingStatusTextStyle: {
    ...Fonts.style.semiBold_12,
    color: Colors.rgb_e15517,
  },
  viewDetailsTextStyle: {
    ...Fonts.style.semiBold_12,
    color: Colors.rgb_000000,
  },
  viewDetailsButtonStyles: {
    width: '40%',
    borderColor: Colors.rgb_e15517,
    borderWidth: 1,
    backgroundColor: 'white',
  },
})
