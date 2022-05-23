/*
 * Reducer actions related with login
 */
import * as types from './types';
import {Strings} from '../utils/Strings';


export function requestOrderPlaced(cartData) {
    return {
        type: types.ORDER_PLACED_REQUEST,
        cartData,
    };
}


export function orderPlacedFailed() {
    return {
        type: types.ORDER_PLACED_FAILED,
    };
}

export function orderPlacedResponse(response) {
    return {
        type: types.ORDER_PLACED_RESPONSE,
        response,
    };
}



export function requestMyOrders(page_no,offset,status,userId) {
    return {
        type: types.ADMIN_MY_ORDERS_REQUEST,
        page_no,offset,status,userId
    };
}


export function myOrdersFailed() {
    return {
        type: types.ADMIN_MY_ORDERS_FAILED,
    };
}

export function myOrdersResponse(response) {
    return {
        type: types.ADMIN_MY_ORDERS_RESPONSE,
        response,
    };
}

export function requestCustomerReports(customerInput) {
    return {
        type: types.CUSTOMERS_REPORTS_REQUEST,
        customerInput
    };
}


export function customerReportsFailed() {
    return {
        type: types.CUSTOMERS_REPORTS_FAILED,
    };
}


export function customerReportsResponse(response) {
    return {
        type: types.CUSTOMERS_REPORTS_RESPONSE,
        response,
    };
}



/************* reporst SCreen****/


export function requestOddReports(customerInput) {
    return {
        type: types.ODD_REPORTS_REQUEST,
        customerInput
    };
}


export function oddOrdersReportsFailed() {
    return {
        type: types.ODD_REPORTS_FAILED,
    };
}

export function oddOrdersReportsResponse(response) {
    return {
        type: types.ODD_REPORTS_RESPONSE,
        response,
    };
}


export function requestProductsReports(customerInput) {
    return {
        type: types.PRODUCTS_REPORTS_REQUEST,
        customerInput
    };
}


export function productsReportsFailed() {
    return {
        type: types.PRODUCTS_REPORTS_FAILED,
    };
}

export function productsReportsResponse(response) {
    return {
        type: types.PRODUCTS_REPORTS_RESPONSE,
        response,
    };
}

export function requestDispatchReports(customerInput) {
    return {
        type: types.DISPATCH_ORDER_REPORTS_REQUEST,
        customerInput
    };
}


export function dispatchReportsFailed() {
    return {
        type: types.DISPATCH_ORDER_REPORTS_FAILED,
    };
}

export function dispatchReportsResponse(response) {
    return {
        type: types.DISPATCH_ORDER_REPORTS_RESPONSE,
        response,
    };
}


export function requestMyCustomers(page_no,offset) {
    return {
        type: types.ADMIN_CUSTOMERS_REQUEST,
        page_no,offset
    };
}


export function myCustomersFailed() {
    return {
        type: types.ADMIN_CUSTOMERS_FAILED,
    };
}

export function myCustomersResponse(response) {
    return {
        type: types.ADMIN_CUSTOMERS_RESPONSE,
        response,
    };
}


export function requestDeviceLogs(page_no,offset,user_id) {
    return {
        type: types.DEVICE_LOGS_REQUEST,
        page_no,offset,user_id
    };
}


export function deviceLogsFailed() {
    return {
        type: types.DEVICE_LOGS_FAILED,
    };
}

export function deviceLogsResponse(response) {
    return {
        type: types.DEVICE_LOGS_RESPONSE,
        response,
    };
}

export function requestFeedback(page_no,offset) {
    return {
        type: types.FEEDBACK_REQUEST,
        page_no,offset
    };
}


export function feedbackFailed() {
    return {
        type: types.FEEDBACK_FAILED,
    };
}

export function feedbackResponse(response) {
    return {
        type: types.FEEDBACK_RESPONSE,
        response,
    };
}

export function modifyOrder(order_id,isModified) {
    return {
        type: types.MODIFY_ORDER,
        order_id,isModified
    };
}

export function requestMyOrderDetail(order_id) {
    return {
        type: types.ORDER_DETAIL_REQUEST,
        order_id,
    };
}


export function orderDetailFailed() {
    return {
        type: types.ORDER_DETAIL_FAILED,
    };
}

export function orderDetailResponse(response) {
    return {
        type: types.ORDER_DETAIL_RESPONSE,
        response,
    };
}


export function logOut() {
    return {
        type: types.LOG_OUT,
    };
}

export function getStateList() {
    return {
        type: types.GET_STATE_LIST
    }
}

export function getStateListFailed() {
    return {
        type: types.GET_STATE_LIST_FAILED
    }
}

export function getStateListResponse(response) {
    return {
        type: types.GET_STATE_LIST_SUCCESS,
        response
    }
}

export function getCityList() {
    return {
        type: types.GET_CITY_LIST
    }
}

export function getCityListFailed() {
    return {
        type: types.GET_CITY_LIST_FAILED
    }
}

export function getCityListResponse(response) {
    console.log("res ::", response)
    return {
        type: types.GET_CITY_LIST_SUCCESS,
        response
    }
}

export function getStateWiseCitiesList(state) {
    return {
        type: types.GET_STATE_WISE_CITIES,
        state
    }
}

export function getStateWiseCitiesSuccess(response){
    return {
        type: types.GET_STATE_WISE_CITIES_SUCCESS,
        response
    }
}

export function getStateWiseCitiesFailed() {
    return {
        type: types.GET_STATE_WISE_CITIES_FAILED
    }
}

export function rejectOrderApi(data) {
    return {
        type: types.REJECT_ORDER,
        data
    }
}

export function rejectOrderSuccess(response){
    return{
        type: types.REJECT_ORDER_SUCCESS,
        response
    }
}
export function rejectOrderFailure() {
    return{
        type: types.REJECT_ORDER_FAILED
    }
}