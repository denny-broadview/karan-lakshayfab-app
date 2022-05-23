import { StyleSheet, Dimensions } from 'react-native';
import {
    ApplicationStyles,
    Colors,
    Fonts,
} from '@resources';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    labelText: {
        ...Fonts.style.bold_20,
        color: Colors.rgb_e15517,
        alignSelf: 'flex-start',
        marginTop: height / 16,
        marginLeft: 24
    },
    textContainerStyle: {
        // borderColor: Colors.rgb_e15517,
        // borderWidth: 1,
        // width: width - 48,
        // marginTop: height / 24,
        // alignSelf: 'center'
        borderColor: Colors.rgb_e15517,
        borderWidth: 1,
        width: width - 48,
        marginTop: height / 24,
        alignSelf: 'center'
    },
    inputStyle: {
        width: width - 24,
        paddingVertical: 14,
        ...Fonts.style.regular_16
    },
    buttonStyle: {
        width: width - 48,
        backgroundColor: Colors.rgb_e15517,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: height / 24
    },
    buttonText: {
        ...Fonts.style.bold_20,
        color: '#fff'
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
     
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
})