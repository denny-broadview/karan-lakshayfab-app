import {Dimensions, StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles
} from '@resources';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;


export default StyleSheet.create({
    container: {
        height: 200,
        width: 200,
         ...ApplicationStyles.shadowBoxCard.container,
    },
    childView: {
        ...ApplicationStyles.shadowBoxCard.container,
        flex: 1,
        height: width / 2,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10

    },
    textStyle: {
        ...Fonts.style.semiBold_14,
        color:Colors.rgb_666666,
        marginTop:20


    },
});
