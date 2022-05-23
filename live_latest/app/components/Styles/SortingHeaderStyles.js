import {StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

export default StyleSheet.create({
    container: {

        flexDirection: 'row', justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 10,
    },

    filterStyle: {
        marginRight: 5,
    },

    textStyles: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_e15517,

    },
});
