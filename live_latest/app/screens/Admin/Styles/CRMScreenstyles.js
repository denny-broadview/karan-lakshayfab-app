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

  crmItemView:{
    ...ApplicationStyles.shadowBoxCard.container,
    backgroundColor: 'white',
    marginHorizontal: 14,
    marginVertical: 7,
    padding:10

  },

  titleTextStyle: {
    ...Fonts.style.semiBold_14,
    color: Colors.rgb_e15517,
    

  },

  addressTextStyle: {
    ...Fonts.style.regular_14,
    color: Colors.rgb_0E0E0E,

  },
  customerTypeStyle:{
    width:12,
    height:12,
    backgroundColor:Colors.rgb_e15517,
    borderRadius:6,
    marginRight:5,
    alignSelf:'center'
  },
  headerItemsView:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:15
  },

  headerItemChildView:{
    ...ApplicationStyles.shadowBoxCard.container,
    borderRadius:5,
    borderWidth:1,
    borderColor:Colors.rgb_e15517,
    padding:5

  },
  headerItemTextStyle:{
    ...Fonts.style.regular_12,
    color: Colors.rgb_383431,
    textAlign:'center',
    marginTop: 10
  },
  searchBarContainer: {
    width: width - 28,
    borderRadius: 30,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.rgb_e15517,
    paddingHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBar: {
    ...Fonts.style.regular_14,
    flex: 1,
    marginRight: 4
  }

});

export default styles;
