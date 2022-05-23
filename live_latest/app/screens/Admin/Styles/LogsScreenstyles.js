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
    marginVertical: 5,
  },

  logsItemView:{
    ...ApplicationStyles.shadowBoxCard.container,
    backgroundColor: 'white',
    marginHorizontal: 14,
    marginVertical: 7,
    padding:10

  },

  childItemsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  titleView: {
    alignSelf: 'center',
    flex: 1.5,
    ...Fonts.style.semiBold_12,
    color: Colors.rgb_000000,
  },
  valueView: {
    alignSelf: 'center',
    flex: 2.2,
    ...Fonts.style.bold_12,
    color: Colors.rgb_000000,
  },


});

export default styles;
