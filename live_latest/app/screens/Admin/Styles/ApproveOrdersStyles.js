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
      
  },
  itemStyle:{
    ...ApplicationStyles.shadowBoxCard.container,
    backgroundColor:'white',
    marginHorizontal:14,
    marginVertical:7,

  },

  textStyle: {
    ...Fonts.style.semiBold_18,
    color: 'black',
    textAlign:'center',
    marginVertical:10


  },
})
