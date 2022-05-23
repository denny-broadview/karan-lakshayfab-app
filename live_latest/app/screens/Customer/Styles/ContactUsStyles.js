import {StyleSheet, Dimensions} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '@resources';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: Colors.white,
        paddingVertical: 10,
    },
    parentView: {
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
        marginHorizontal: 14,
        paddingVertical: 10,
    },
    mainView: {
        flexDirection: 'row',
        marginTop: 10,
    },
    titleStyle: {
        ...Fonts.style.bold_18,
        color: Colors.rgb_e15517,
        marginVertical: 2,
        paddingHorizontal: 10,
    },
    headerStyle: {
        ...Fonts.style.semiBold_15,
        color: Colors.rgb_000000,
        paddingHorizontal: 10,
        marginTop:10,
        marginBottom:2
    },
    labelStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
        marginVertical: 2,
        flex: 1.2,
        paddingHorizontal: 10,
    },
    textTitleStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_000000,
        marginVertical: 2,
        paddingHorizontal: 10,
        flex: 2,
    },
    addressStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_000000,
        paddingHorizontal: 10,
       // marginVertical:5,
    },
});
