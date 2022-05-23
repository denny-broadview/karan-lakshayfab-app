import {StyleSheet, Dimensions} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    itemStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
       marginHorizontal: 14,
        marginVertical: 7,

    },

    textStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_666666,
        textAlign: 'center',
        marginVertical: 10,
       // paddingRight: 50,
       // backgroundColor:'red'


    },
    fabricImageStyle: {
        width: width - 25,
        height: 500,
        marginBottom: 5,
    },

    toggleButtonStyle: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
});
