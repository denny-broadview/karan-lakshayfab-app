/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';
import {Constants} from '../Resources';
import {Strings} from '../utils/Strings';

const initialState = {
    isLoggedIn: false,
    productData:[],
    cartArr: [],
    adminAllOrdersData:null,
    customerReportsList:[],
    stateList: [],
    cityList: [],
    stateWiseCity:[],
    rejectOrder:[]
};
export const adminReducer = createReducer(initialState, {

    // My Orders Request
    [types.ADMIN_MY_ORDERS_REQUEST](state, action) {
        return {...state, isAllOrdersDataFound: false, errorMessage: '',};
    },

    [types.ADMIN_MY_ORDERS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            isAllOrdersDataFound:true,
            adminAllOrdersData: action.response,
            errorMessage: message
        };
    },

    [types.ADMIN_MY_ORDERS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isAllOrdersDataFound:true, status: 401, adminAllOrdersData: null};
    },

    //Order Details

    [types.ORDER_DETAIL_REQUEST](state, action) {
        return {orderDetailResponse :null,isOrderDetailFound:false };
    },

    [types.ORDER_DETAIL_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            status: status.toString(),
            orderDetailResponse: action.response,
            errorMessage: message,
            isOrderDetailFound: true,
        };
    },

    [types.ORDER_DETAIL_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isOrderDetailFound: true, status: 401, orderDetailResponse: null};
    },

    [types.MODIFY_ORDER](state,action) {

        return {
            order_id:action.order_id,
            isModified:action.isModified

        };
    },

    // My Customers Request
    [types.ADMIN_CUSTOMERS_REQUEST](state, action) {
        return {...state, isAllCustomersFound: false, errorMessage: '',};
    },

    [types.ADMIN_CUSTOMERS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            isAllCustomersFound:true,
            customerList: action.response,
            errorMessage: message
        };
    },

    [types.ADMIN_CUSTOMERS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isAllCustomersFound:true, status: 401, customerList: null};
    },

    [types.DEVICE_LOGS_REQUEST](state, action) {
        return {...state, };
    },

    [types.DEVICE_LOGS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            deviceLogsList: action.response,
            errorMessage: message
        };
    },

    [types.DEVICE_LOGS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, deviceLogsList: null};
    },

    [types.FEEDBACK_REQUEST](state, action) {
        return {...state, };
    },

    [types.FEEDBACK_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            feedbackListing: action.response,
            errorMessage: message
        };
    },

    [types.FEEDBACK_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, feedbackListing: null};
    },


    /*****************  Reports Section *****************/

    [types.CUSTOMERS_REPORTS_REQUEST](state, action) {
        return {...state,  errorMessage: '',};
    },

    [types.CUSTOMERS_REPORTS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            customerReportsList: action.response,
            errorMessage: message
        };
    },

    [types.CUSTOMERS_REPORTS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, customerReportsList: []};
    },

    [types.DISPATCH_ORDER_REPORTS_REQUEST](state, action) {
        return {...state,  errorMessage: '',};
    },

    [types.DISPATCH_ORDER_REPORTS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            customerReportsList: action.response,
            errorMessage: message
        };
    },

    [types.DISPATCH_ORDER_REPORTS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, customerReportsList: []};
    },

    [types.PRODUCTS_REPORTS_REQUEST](state, action) {
        return {...state,  errorMessage: '',};
    },

    [types.PRODUCTS_REPORTS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            customerReportsList: action.response,
            errorMessage: message
        };
    },

    [types.PRODUCTS_REPORTS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, customerReportsList: []};
    },

    [types.ODD_REPORTS_REQUEST](state, action) {
        return {...state,  errorMessage: '',};
    },

    [types.ODD_REPORTS_RESPONSE](state, action) {
        const {status, message} = action.response;

        return {
            ...state,
            customerReportsList: action.response,
            errorMessage: message
        };
    },

    [types.ODD_REPORTS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, customerReportsList: []};
    },


    // Logout
    [types.LOG_OUT](state) {

        return {...state, isLoggedIn: false, cartArr: null};
    },

    // Get State List
    [types.GET_STATE_LIST](state) {
        return {...state, errorMessage: ''}
    },
    [types.GET_STATE_LIST_SUCCESS](state,action) {
        const {status, message} = action.response
        return {
            ...state,
            stateList: action.response,
            errorMessage: message
        }
    },
    [types.GET_STATE_LIST_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, status: 401, stateList: []}
    },

    // City List
    [types.GET_CITY_LIST](state) {
        return {...state, errorMessage:''}
    },
    [types.GET_CITY_LIST_SUCCESS](state,action) {
        const {status, message} = action.response
        return {
            ...state,
            cityList: action.response,
            errorMessage: message
        }
    },
    [types.GET_CITY_LIST_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, status: 401, cityList: []}
    },
    [types.GET_STATE_WISE_CITIES](state) {
        return {...state, errorMessage:''}
    },
    [types.GET_STATE_WISE_CITIES_SUCCESS](state,action) {
        const {status, message} = action.response
        return {
            ...state,
            stateWiseCity:action.response,
            errorMessage: message
        }
    },
    [types.GET_STATE_WISE_CITIES_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, status: 401, stateWiseCity:[]}
    },

    [types.REJECT_ORDER](state) {
        return {...state, errorMessage:''}
    },
    [types.REJECT_ORDER_SUCCESS](state,action) {
        const {status, message} = action.response
        return {
            ...state,
            rejectOrder:action.response,
            errorMessage: message
        }
    },
    [types.REJECT_ORDER_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, status: 401, rejectOrder:[]}
    },
});
