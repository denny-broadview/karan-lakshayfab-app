import {StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';
import {Dimensions,Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: Platform.OS=="ios"?((height<700)?0.6:0.5) :(height<650?0.7:0.6),
        backgroundColor: 'white',
    },
    parent: {
        margin: 0,
        padding: 0,
    },
    sortView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    sortTextStyle: {
        ...Fonts.style.semiBold_16,
        color: Colors.black,
    },
    divider: {
        backgroundColor: Colors.rgb_E7E7E7,
        height: 1,
        width: '100%',
    },
    sortByNameText: {
        ...Fonts.style.semiBold_14,
        color: Colors.black,
        padding: 15,
    },
    applyFilterStyle: {
        width: '40%',
        alignSelf: 'center',
        marginTop: 15,
    },
    applyFilterTextStyle: {
        ...Fonts.style.semiBold_14,
    },
    nameSortBoxView: {
        borderRadius: 3,
        borderColor: Colors.rgb_b9b9b9,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
    },
    ascendingView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    ascendingSelectedView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        alignItems: 'center',
        backgroundColor: Colors.rgb_e15517,
    },
    centerDivider: {
        width: 1,
        backgroundColor: Colors.rgb_b9b9b9,
    },
    textAscendingView: {
        ...Fonts.style.semiBold_16,
        color: Colors.rgb_e15517,
    },
    textAscendingSelectedView: {
        ...Fonts.style.semiBold_16,
        color: 'white',
    },
});
