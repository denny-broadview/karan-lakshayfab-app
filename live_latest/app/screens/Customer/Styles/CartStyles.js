import {StyleSheet, Dimensions} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '@resources';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    parentView: {
        flex: 1,
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
        marginHorizontal: 14,
        marginVertical: 7,
    },
    itemStyle: {
       flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,

        /* ...ApplicationStyles.shadowBoxCard.container,
         backgroundColor: 'white',

         marginHorizontal: 14,
         marginVertical: 7,*/
    },
    minimumItemStyle: {
       // ...ApplicationStyles.shadowBoxCard.container,
        //flexDirection: 'row',
        backgroundColor: 'white',
       // marginHorizontal: 14,
      //  marginVertical: 7,
      //  padding: 20,
        justifyContent: 'space-between',

    },
    imageStyle: {
        width: width-25,
        height: 238,
     //   backgroundColor:'red'
       // margin: 10,

    },

    itemContentView: {
        marginHorizontal: 10,
        flex:3
    },
    subCategoryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginBottom: 5,
        paddingHorizontal: 10,
        //   backgroundColor: 'blue',
    },

    minQtyStyle: {
        ...Fonts.style.regular_12,
        color: Colors.rgb_000000,
        marginVertical: 5,


    },

    priceTotalStyle: {
        ...Fonts.style.bold_14,
        color: Colors.rgb_000000,
        marginVertical: 5,

    },
    catalogNameTitleStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
       // marginTop:35,
    },

    textTitleStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
        marginVertical: 2,
    },
    textDescriptionStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_666666,
        marginVertical: 10,
    },

    plusMinusTextStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_030102,
        marginHorizontal: 10,

    },
});
