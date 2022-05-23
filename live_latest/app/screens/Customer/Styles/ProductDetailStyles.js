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

    minimumItemStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        //flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 14,
       marginBottom: 6,
        padding: 10,
        justifyContent: 'space-between',

    },

    minimumProductPriceStyle:{
        ...Fonts.style.semiBold_18,
        color: Colors.rgb_030102,

    },
    perPieceStyle:{
        ...Fonts.style.semiBold_13,
        color: Colors.rgb_030102,
    },
    minimumQtyStyle:{
        ...Fonts.style.regular_14,
        color: Colors.rgb_030102,
        marginTop:10,

    },

    plusMinusTextStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_030102,
        marginHorizontal:10,

    },

    addCartStyles:{
        ...Fonts.style.bold_18,
    },
    pieceTextStyle:{
        ...Fonts.style.regular_14,
        color: Colors.rgb_030102,
        textAlign:'left'

    },

    subTotalTextPriceStyle:{
        ...Fonts.style.semiBold_18,
        color: Colors.rgb_030102,
        //textAlign:'left',

    },
    subTotalView:{
        flexDirection:'row',
        justifyContent: 'space-between'
    }



});
