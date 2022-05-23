import {Dimensions, Platform,StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';
import DeviceInfo from 'react-native-device-info';

const width = Dimensions.get('window').width;
const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
    container: {
        ...ApplicationStyles.shadowBoxCard.container,
        //borderRadius: 10,
        //paddingBottom: 10,
        // paddingTop: 10,
        flexDirection: 'row',
        marginHorizontal: 14,
        marginTop: 10,
        height: 50,
        padding: 0,
        backgroundColor: Colors.rgb_e15517,
        alignItems: 'center',
        //alignSelf: 'center',
    },

    homeIconStyle: {
        marginHorizontal: 10,
    },
    breadScrumIconStyle: {
        height: 40,
    },
    textStyles: {
        ...Fonts.style.semiBold_14,
        color: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center',
        width: width / 4,
        paddingVertical: 5,
    },
    singleTextStyles: {
        ...Fonts.style.semiBold_14,
        color: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },

    searchStyle: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderBottomWidth: 0,
        height: 40,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchTextInputStyle: {
        marginHorizontal: 10,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        width: isTablet?Platform.OS=='ios'?'93%':'91%':'82%',
        color: Colors.rgb_030102,
    },


});
