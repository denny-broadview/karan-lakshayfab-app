import {StyleSheet,Dimensions} from 'react-native';
import {
    Colors,
    Fonts,
} from '@resources';
import DeviceInfo from 'react-native-device-info';
const width=Dimensions.get('window').width
const isTablet = DeviceInfo.isTablet();
export default StyleSheet.create({
    label_info: {
        flexDirection: 'row',
        width:'95%',
        alignItems: 'center',
    },
    label: {
        //...Fonts.style.light_12,
        color: Colors.rgb_3e4a59,
    },
    icon: {
        paddingHorizontal: 9.6,
    },
    textInput: {
        //  ...Fonts.style.regular_18,
        paddingVertical: 5,
        paddingHorizontal: 5,
        ...Fonts.style.regular_12,
        color: Colors.rgb_383431,

    },
    showHidePassword: {
        //  ...Fonts.style.medium_14,
        position: 'absolute',
        right: isTablet?-30:-10,
        //bottom: isTablet?0:7,
       // top:0,
        //padding: 15,


    },
    errorMessage: {
        // ...Fonts.style.regular_12,
        color: Colors.rgb_e15517,
        textAlign: 'center',
        marginTop: 5,
    },
    counterNumber: {
        // ...Fonts.style.light_12,
        color: Colors.rgb_9b9b9b,
        letterSpacing: 0.3,
        lineHeight: 14,
        textAlign: 'right',
    },
});
