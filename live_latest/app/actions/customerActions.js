import * as types from './types';

export function requestFabric(status,page_no,offset) {
    return {type: types.GET_FABRIC_REQUEST,status,page_no,offset};
}

export function getFabricFailure() {
    return {type: types.FABRIC_FAILURE};
}

export function getFabricSuccess(response) {
    return {type: types.FABRIC_SUCCESS, response};
}


export function requestCatalog(fabricId,status,page_no, offset,search) {
    return {type: types.GET_CATALOG_REQUEST,fabricId,status,page_no, offset,search};
}

export function getCatalogFailure() {
    return {type: types.CATALOG_FAILURE};
}

export function getCatalogSuccess(response) {
    return {type: types.CATALOG_SUCCESS, response};
}



export function requestProduct(catalogId,status,page_no, offset,search) {
    return {type: types.GET_PRODUCT_REQUEST,catalogId,status,page_no, offset,search};
}

export function getProductFailure() {
    return {type: types.PRODUCT_FAILURE};
}

export function getProductSuccess(response) {
    return {type: types.PRODUCT_SUCCESS, response};
}

export function storeCartData(cartObj,operationType) {
    return {type: types.STORE_CART_DATA,cartObj,operationType};
}

export function clearCart() {
    return {type: types.CLEAR_CART};
}


export function requestAddAddress(userInfo) {
    return {
        type: types.ADD_ADDRESS_REQUEST,
        userInfo,
    };
}


export function addAddressFailed() {
    return {
        type: types.ADD_ADDRESS_FAILED,
    };
}

export function addAddressResponse(response) {

    return {
        type: types.ADD_ADDRESS_RESPONSE,
        response,
    };
}


export function requestUpdateAddress(userInfo) {
    return {
        type: types.UPDATE_ADDRESS_REQUEST,
        userInfo,
    };
}


export function updateAddressFailed() {
    return {
        type: types.UPDATE_ADDRESS_FAILED,
    };
}

export function updateAddressResponse(response) {

    return {
        type: types.UPDATE_ADDRESS_RESPONSE,
        response,
    };
}


export function requestFetchAddress(userId) {
    return {
        type: types.FETCH_ADDRESS_REQUEST,
        userId,
    };
}


export function fetchAddressFailed() {
    return {
        type: types.FETCH_ADDRESS_FAILED,
    };
}

export function fetchAddressResponse(response) {

    return {
        type: types.FETCH_ADDRESS_RESPONSE,
        response,
    };
}


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


export function orderDetailFailed() {
    return {
        type: types.ORDER_DETAIL_FAILED,
    };
}


export function getUserDetails(user_id) {
    return {
        type: types.GET_USER_DETAILS_REQUEST,
        user_id
    };
}

export function userDetailsSuccess(response) {
    return {
        type: types.GET_USER_DETAILS_RESPONSE,
        response,
    };
}


export function userDetailsFail() {
    return {
        type: types.GET_USER_DETAILS_FAILED,
    };
}

export function updateUserDetails(userInfo) {
    return {
        type: types.UPDATE_USER_DETAILS_REQUEST,
        userInfo
    };
}

export function updateUserDetailsSuccess(response) {
    return {
        type: types.UPDATE_USER_DETAILS_RESPONSE,
        response,
    };
}


export function updateUserDetailsFail() {
    return {
        type: types.UPDATE_USER_DETAILS_FAILED,
    };
}



export function logOut() {
    return {
        type: types.LOG_OUT,
    };
}

export function sendOTPAction(data) {
    return {
        type: types.SEND_OTP,
        data
    }
}

export function sendOTPActionSuccess(response) {
    return {
        type: types.SEND_OTP_SUCCESS,
        response
    }
} 

export function sendOTPActionFailed() {
    return {
        type: types.SEND_OTP_FAILED
    }
}