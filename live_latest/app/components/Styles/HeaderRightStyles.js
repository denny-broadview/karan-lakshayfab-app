import {StyleSheet} from 'react-native';
import {
    Colors, Fonts,
} from '@resources';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 17,
    },

    headerRightText: {
        ...Fonts.style.black_20,
        color: Colors.rgb_3692ff,
        marginRight: 24,
    },

    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.rgb_4297ff,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7,
    },
    badgeContainer: {
        width: 18,
        height: 18,
        borderRadius: 9,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'white',
        right: -9,
        top: -8,
    },
    badgeText: {
        //  color: Colors.white,
        ...Fonts.style.bold_10,
        alignSelf: 'center',
    },

});
