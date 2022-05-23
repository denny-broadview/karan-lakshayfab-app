import { StyleSheet } from 'react-native'
import {
  Colors,
  Fonts,
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
  clearFilterText:{
    ...Fonts.style.regular_12,
    color: Colors.rgb_b9b9b9,
  },
})
