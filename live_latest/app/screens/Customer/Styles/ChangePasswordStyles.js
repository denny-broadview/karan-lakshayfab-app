import {StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';
import colors from '../../../Resources/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,

    },
    textInputParentStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: Colors.rgb_f9f9f9,
        borderColor: Colors.rgb_e15517,
        flexDirection: 'row',
        marginHorizontal: 14,
        //width: '100%',
        height: 50,
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 5,

    },

    textInputStyle: {
        width: '90%',
        marginLeft: 5,
        ...Fonts.style.regular_12,
        color: Colors.rgb_383431,
    },
    btnStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        width: '46%',
        backgroundColor: colors.rgb_e15517,
        alignItems: 'center',
        padding: 10,
    },
    textBtnStyle: {
        ...Fonts.style.bold_16,
        textAlign: 'center',
        color: 'white',

    },


});
