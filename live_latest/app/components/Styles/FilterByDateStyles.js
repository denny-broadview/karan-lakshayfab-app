import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // flex: Platform.OS == 'ios' ? ((height < 700) ? 0.6 : 0.5) : (height < 650 ? 0.7 : 0.5),
        backgroundColor: 'white',
    },
    parentView: {
        //   ...ApplicationStyles.shadowBoxCard.container,
       // marginTop: 20,
        padding: 0,

    },
    sortView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },

    sortTextStyle: {
        ...Fonts.style.semiBold_18,
        color: Colors.black,
    },
    divider: {
        backgroundColor: Colors.rgb_707070,
        opacity: 0.3,
        height: 1,
        width: '100%',
    },
    filterByWeekMonth: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    dateRangeView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: 'white',
    },
    calendarView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.rgb_E0E0E0,
       // marginTop: 10,
        marginHorizontal: 5,
        padding: 10,
    },

    applyFilterStyle: {
        width: '40%',
        alignSelf: 'center',
        marginTop: 20,
    },

    applyFilterTextStyle: {
        ...Fonts.style.semiBold_14,
    },

    dropDownContainer: {
        backgroundColor: 'white',
        width: 180,
        borderRadius: 12,
        borderColor: Colors.rgb_e15517,
        borderWidth: 1,

    },
    placeholderStyle: {
        ...Fonts.semiBold_20,
        color: Colors.rgb_666666,

    },
    arrowStyle: {
        backgroundColor: 'red',
    },
    arrowContainerView: {
        backgroundColor: Colors.rgb_e15517,
        marginRight: -9.5,
        marginVertical: -4.5,
        paddingHorizontal: 10,
    },
    dropDownItemStyle: {
        ...Fonts.semiBold_48,
        color: Colors.rgb_666666,
    },
    circleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       // position: 'absolute',
        marginTop: 10,
        top: 0,
        left: 0,
        right: 0,
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },


});
