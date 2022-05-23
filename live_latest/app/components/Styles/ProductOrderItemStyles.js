import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '@resources';

export default StyleSheet.create({

    productContainerStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
       flex:1,
        backgroundColor: 'white',
        marginVertical: 7,
    },
    productItemStyle: {
        flexDirection:'row',
        flex:1,
        backgroundColor: 'white',
        marginLeft: 7,
        marginRight:5,
        marginVertical: 7,
    },

    productTitleStyle:{
        ...Fonts.style.bold_15,
        color: Colors.rgb_e15517,
        marginHorizontal: 7,
        marginVertical:7
    },
    productItemContentView: {
        flex: 2,
        marginLeft: 10,

    },

    productTextTitleStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
        marginVertical: 5,
        flex:2
    },
    fabricTextTitleStyle: {
        ...Fonts.style.semiBold_12,
        color: Colors.rgb_000000,
        marginVertical: 5,
        flex:2
    },

    productTotalPriceTitleStyle: {
        ...Fonts.style.bold_13,
        color: Colors.rgb_000000,
        marginVertical: 10,
        textAlign:'right',
        flex:3,
       // marginTop:10,
    },

    totalQtyTextStyle:{
        ...Fonts.style.regular_12,
        color: Colors.rgb_000000,
        marginTop:10,
    },
    descTextStyle:{
        ...Fonts.style.regular_12,
        color: Colors.rgb_000000,
        marginTop:10,
    },

});
