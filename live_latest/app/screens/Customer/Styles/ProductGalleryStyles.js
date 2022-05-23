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
    },

    dropDownContainer: {
        backgroundColor: 'white',
        width: 180,
        borderRadius: 12,
        borderColor: Colors.rgb_e15517,
        borderWidth: 1,


    },
    placeholderStyle: {
        ...Fonts.semiBold_20,
        color: Colors.rgb_666666,

    },
    arrowStyle: {
        backgroundColor: 'red',
    },
    arrowContainerView: {
        backgroundColor: Colors.rgb_e15517,
        marginRight: -9.5,
        marginVertical: -4.5,
        paddingHorizontal: 10,
    },
    dropDownItemStyle: {
        ...Fonts.semiBold_48,
        color: Colors.rgb_666666,
    },
    monthlyView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'center',
        position: 'absolute',

        top: 0,
        left: 0,
        right: 0,
    },
    row: {
        flex: 1,
        justifyContent: "space-around",

    }

});
