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

    reportsItemStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
        marginHorizontal: 14,
        marginVertical: 7,
        paddingVertical: 5,

    },
    childItemsView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 5,

    },
    titleView: {
        alignSelf: 'center',
        flex: 1.2,
        ...Fonts.style.semiBold_12,
        color: Colors.rgb_000000,
    },
    valueView: {
        alignSelf: 'center',
        flex: 1.5,
        ...Fonts.style.bold_12,
        color: Colors.rgb_000000,
    },
    firmNameTextStyle: {

        ...Fonts.style.semiBold_14,
        color: Colors.rgb_e15517,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.rgb_E7E7E7,
        marginVertical: 5,
    },

    orderNoView: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 5,
        justifyContent: 'space-between',
    },

    productReportView: {

        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 5,
        //justifyContent: 'space-between',
    },


    oderNoLabelStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_e15517,

    },
    oderNoTextStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_000000,
    },
    productPriceTextStyle: {
        ...Fonts.style.bold_12,
        color: Colors.rgb_000000,
    },

    acceptRejectStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        marginTop: 0,
        backgroundColor: Colors.rgb_f7f7f7,
        marginBottom: 0,
        marginHorizontal:15,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,

    },
    acceptRejectTouchableStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        // backgroundColor:'red',
        flex: 1,
    },
    acceptRejectTextStyle: {
        textAlign: 'center',
        ...Fonts.style.regular_12,
        color: Colors.rgb_4b4b4b,
        //    marginHorizontal: 8,
    },
    modalView: {
        // alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal:10,
        elevation: 5,
        height: 180,
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
});
