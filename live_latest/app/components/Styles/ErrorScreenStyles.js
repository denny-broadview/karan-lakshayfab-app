import { StyleSheet } from 'react-native'
import {
  Colors,
  Fonts
} from '@resources'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop:40,
  },
  fullContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Fonts.style.medium_16,
    color: Colors.rgb_0E0E0E,
    textAlign: 'center',
    lineHeight: 18,
  },
  message: {
    ...Fonts.style.regular_14,
    color: Colors.rgb_666666,
    marginTop: 11,
    paddingHorizontal: 66,
    textAlign: 'center',
    lineHeight: 18
  },
  button: {
    marginTop: 54
  },
  icon: {
    ...Fonts.style.black_48,
    color: Colors.rgb_4a4a4a,
  },
  errorTitle: {
    ...Fonts.style.bold_20,
    color: Colors.rgb_e15517,
    marginTop: 28,
    textAlign: 'center',
    marginHorizontal:30
   // paddingHorizontal: 72,

  },
  errorMessage: {
    ...Fonts.style.semiBold_16,
    lineHeight: 22,
    color: Colors.rgb_e15517,
    marginTop: 23,
    textAlign: 'center',
    paddingHorizontal: 38,
  },
  cta: {
    marginTop: 51,
    paddingHorizontal: 40,
  },
})
