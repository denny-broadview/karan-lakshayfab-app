/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {put, call, select} from 'redux-saga/effects';

import * as customerActions from 'app/actions/customerActions';
import {loginReducer} from '../reducers/loginReducer';
import {useSelector} from 'react-redux';

const userId = (state) => state.loginReducer.id


// Our worker Saga that logins the user
export function* getFabrics(api, action) {
    const id = yield select(userId)
    const checkUserActive = yield call(api.checkUserActive, {id});
    console.log(checkUserActive)
   /* if(checkUserActive.ok){

    }else {

    }*/

    const {status, page_no, offset} = action;
    let data = {
        status,
        offset,
        page_no,
    };
    const response = yield call(api.fabric, data);
    if (response.ok) {
        yield put(customerActions.getFabricSuccess(response.data));
    } else {
        yield put(customerActions.getFabricFailure());
    }
}

export function* getCatalog(api, action) {

    const {
        fabricId, status, offset, page_no,search
    } = action;
    const user_id = yield select(userId)

    const response = yield call(api.catalog, {user_id,fabricId, status, page_no, offset,search});

    if (response.ok) {
        yield put(customerActions.getCatalogSuccess(response.data));
    } else {
        yield put(customerActions.getCatalogFailure());

    }
}


export function* getProducts(api, action) {
    const {
        catalogId,product_id, status, offset,
        page_no,search
    } = action;
//catalogId, status,page_no, offset,search

    console.log(catalogId)
    // debugger
    const response = yield call(api.products, {catalogId, status,page_no, offset,search});

    console.log('-----',response.data)
    // debugger
    if (response.ok) {
        yield put(customerActions.getProductSuccess(response.data));
    } else {
        yield put(customerActions.getProductFailure());
    }
}

export function* getAllAddresses(api, action) {
    const {userId} = action;
    let data = {user_id: userId};
    const response = yield call(api.requestAddress, JSON.stringify(data));
    if (response.ok) {
        yield put(customerActions.fetchAddressResponse(response.data));
    } else {
        yield put(customerActions.fetchAddressFailed());
    }
}

export function* addNewAddress(api, action) {
    const {userInfo} = action;
    const response = yield call(api.addAddress, JSON.stringify(userInfo));
    if (response.ok) {
        yield put(customerActions.addAddressResponse(response.data));
    } else {
        yield put(customerActions.addAddressFailed());
    }
}

export function* updateAddress(api, action) {
    const {userInfo} = action;
    const response = yield call(api.updateAddress, JSON.stringify(userInfo));
    if (response.ok) {
        yield put(customerActions.updateAddressResponse(response.data));
    } else {
        yield put(customerActions.updateAddressFailed());
    }
}

export function* orderPlaced(api, action) {
    const {cartData} = action;
    const response = yield call(api.orderPlaced, JSON.stringify(cartData));
    if (response.ok) {
        yield put(customerActions.orderPlacedResponse(response.data));
    } else {
        yield put(customerActions.orderPlacedFailed());
    }
}


export function* getOrders(api, action) {
    const {cartData} = action;
    const response = yield call(api.getOrders, JSON.stringify(cartData));
    if (response.ok) {
        yield put(customerActions.myOrdersResponse(response.data));
    } else {
        yield put(customerActions.myOrdersFailed());
    }
}


export function* getOrderDetails(api, action) {
    const {cartData} = action;
    const response = yield call(api.getOrderDetail, JSON.stringify(cartData));
    if (response.ok) {
        yield put(customerActions.orderDetailResponse(response.data));
    } else {
        yield put(customerActions.orderDetailFailed());
    }
}


export function* getUserDetails(api, action) {
    const {user_id} = action;
    const response = yield call(api.getUserDetails, {user_id});
    if (response.ok) {
        yield put(customerActions.userDetailsSuccess(response.data));
    } else {
        yield put(customerActions.userDetailsFail());
    }
}

export function* updateUserDetails(api, action) {
    const {userInfo} = action;
    const response = yield call(api.updateUserDetails, JSON.stringify(userInfo));

    if (response.ok) {

        yield put(customerActions.updateUserDetailsSuccess(response.data));
    } else {
        yield put(customerActions.updateUserDetailsFail());
    }
}

export function* sendOTPFunc(api, action) {
    const {data} = action
    const response = yield call(api.sendOTP, JSON.stringify(data))
    
    if (response.ok) {
        yield put(customerActions.sendOTPActionSuccess(response))
    } else {
        yield put(customerActions.sendOTPActionFailed())
    }
}