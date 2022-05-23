import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '@resources';

export default StyleSheet.create({

    productContainerStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
       flex:1,
        backgroundColor: 'white',
        marginVertical: 7,
    },
    plusMinusTextStyle:{
        ...Fonts.style.regular_14,
        color: Colors.rgb_030102,
        width:50,
        height:30,
       marginHorizontal:5,
        textAlign:'center'
    },
    seprator:{
        width:'100%',
        height:1,
        backgroundColor: Colors.rgb_e3e3e3

    }

});
