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
  text: {
    ...Fonts.style.semiBold_14,
    color: Colors.white,

  },
})
