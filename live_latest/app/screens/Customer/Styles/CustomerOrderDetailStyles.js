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
       // justifyContent: 'center',
      //  alignSelf: 'center',
    },

    headerView:{
        ...ApplicationStyles.shadowBoxCard.container,
        marginTop:15,
        marginBottom:10,
        paddingVertical:15,
        paddingHorizontal:10

    },
    orderDateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    placedDeliveredDateView:{
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_383431,

    },

    oderDateTextStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_383431,

    },

    headerItemsView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:30
    },

    headerItemChildView:{
        ...ApplicationStyles.shadowBoxCard.container,
        borderRadius:5,
        borderWidth:1,
        borderColor:Colors.rgb_e15517,
        padding:5,

    },
    headerItemTextStyle:{
        ...Fonts.style.regular_12,
        color: Colors.rgb_383431,
        textAlign:'center',
        marginTop: 10
    }


});
