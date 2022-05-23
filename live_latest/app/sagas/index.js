/**
 *  Redux saga class init
 */
import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as types from '../actions/types';
import {forgotPasswordAsync, loginAsync, signupAsync, updatePassword, verifyOtp} from './loginSaga';
import AuthApi from '../services/AuthApi';
import {
    addNewAddress,
    getAllAddresses,
    getCatalog,
    getFabrics,
    getProducts, getUserDetails,
    orderPlaced,
    updateAddress, updateUserDetails,
} from './customerSaga';
import {
    getCustomerReports,
    getCustomers,
    getDeviceLogs, getDispatchOrdersReports, getOddReports,
    getOrderDetails,
    getOrders,
    getProductReports,
    getStateList,
    getCityList,
    getStateWiseCity,
    rejectOrderWithReason

} from './adminSaga';

import CustomerApi from '../services/CustomerApi';
import AdminApi from '../services/AdminApi';

const authAPi = AuthApi.create();
const customerApi = CustomerApi.create();
const adminApi = AdminApi.create();

export default function* watch() {
    yield all([
        // takeEvery(types.LOGIN_REQUEST, loginSaga),
        takeLatest(types.LOGIN_REQUEST, loginAsync, authAPi),
        takeLatest(types.SIGNUP_REQUEST, signupAsync, authAPi),
        takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPasswordAsync, authAPi),
        takeLatest(types.VERIFY_OTP_REQUEST, verifyOtp, authAPi),
        takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword, authAPi),
        takeEvery(types.GET_FABRIC_REQUEST, getFabrics, customerApi),
        takeEvery(types.GET_CATALOG_REQUEST, getCatalog, customerApi),
        takeLatest(types.GET_PRODUCT_REQUEST, getProducts, customerApi),
        takeLatest(types.FETCH_ADDRESS_REQUEST, getAllAddresses, customerApi),
        takeLatest(types.ADD_ADDRESS_REQUEST, addNewAddress, customerApi),
        takeLatest(types.UPDATE_ADDRESS_REQUEST, updateAddress, customerApi),
        takeLatest(types.ORDER_PLACED_REQUEST, orderPlaced, customerApi),
        takeLatest(types.ADMIN_MY_ORDERS_REQUEST, getOrders, adminApi),
        takeLatest(types.ORDER_DETAIL_REQUEST, getOrderDetails, adminApi),
        takeLatest(types.ADMIN_CUSTOMERS_REQUEST, getCustomers, adminApi),
        takeLatest(types.DEVICE_LOGS_REQUEST, getDeviceLogs, adminApi),
        takeLatest(types.GET_USER_DETAILS_REQUEST, getUserDetails, customerApi),
        takeLatest(types.UPDATE_USER_DETAILS_REQUEST, updateUserDetails, customerApi),
        takeLatest(types.CUSTOMERS_REPORTS_REQUEST, getCustomerReports, adminApi),
        takeLatest(types.PRODUCTS_REPORTS_REQUEST, getProductReports, adminApi),
        takeLatest(types.ODD_REPORTS_REQUEST, getOddReports, adminApi),
        takeLatest(types.DISPATCH_ORDER_REPORTS_REQUEST, getDispatchOrdersReports, adminApi),
        takeLatest(types.GET_STATE_LIST, getStateList, adminApi),
        takeLatest(types.GET_CITY_LIST, getCityList, adminApi),
        takeLatest(types.GET_STATE_WISE_CITIES,getStateWiseCity,adminApi),
        takeLatest(types.REJECT_ORDER, rejectOrderWithReason, adminApi),
    ]);

}
