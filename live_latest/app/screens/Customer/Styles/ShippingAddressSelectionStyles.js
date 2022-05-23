import {StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },


    shippingItemStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
        marginHorizontal: 14,
        marginVertical: 7,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    addAddressStyle: {
        marginLeft: 15,
        ...Fonts.style.semiBold_18,
        color: Colors.rgb_e15517,

    },

    addressTextStyle: {
        ...Fonts.style.regular_12,
        color: Colors.rgb_090909,
        marginTop: 10,
    },

    userNameTextStyle: {
        ...Fonts.style.bold_18,
        color: Colors.rgb_e15517,
    },
    textStyle: {
        alignSelf: 'center',
    },

});
