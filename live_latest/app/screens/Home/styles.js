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
   // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
   //marginVertical: 5,
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
});

export default styles;
