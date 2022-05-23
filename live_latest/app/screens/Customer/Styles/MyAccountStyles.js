import { StyleSheet } from 'react-native'
import {
  Colors,
  Fonts,
    ApplicationStyles
} from '@resources'

export default StyleSheet.create({
  container: {
     flex:1,
    backgroundColor:Colors.white,
    paddingVertical:25,
   // justifyContent:'center'
  },

  updateTextParentView:{
    ...ApplicationStyles.shadowBoxCard.container,
    paddingVertical:25,
    paddingHorizontal:20,
    marginHorizontal:25,
    backgroundColor: 'white',
    marginVertical:20,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  textStyle:{
    alignSelf:'center'
  }

})
