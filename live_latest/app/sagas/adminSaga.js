/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {put, call, select} from 'redux-saga/effects';

import * as adminActions from 'app/actions/adminActions';

export function* getOrders(api, action) {
  const {page_no,offset,status} = action;

  let data={
    "page_no" : page_no,
    "offset" : offset,
    "order_status":status,
    "userId":action.userId
  }

  console.log('orderApi--',data)
  const response = yield call(api.getOrders, JSON.stringify(data));
  // debugger

  if (response.ok) {
    yield put(adminActions.myOrdersResponse(response.data));
  } else {
    yield put(adminActions.myOrdersFailed());
  }
}


export function* getOrderDetails(api, action) {
  const {order_id} = action;
  const response = yield call(api.getOrderDetail, {order_id});
  if (response.ok) {
    yield put(adminActions.orderDetailResponse(response.data));
  } else {
    yield put(adminActions.orderDetailFailed());
  }
}


export function* getCustomers(api, action) {
  const {page_no,offset} = action;

  let data={
    "page_no" : page_no,
    "offset" : offset,
  }

  console.log('customersAPi--',data)
  const response = yield call(api.getCustomers, JSON.stringify(data));

  if (response.ok) {
    yield put(adminActions.myCustomersResponse(response.data));
  } else {
    yield put(adminActions.myCustomersFailed());
  }
}


export function* getDeviceLogs(api, action) {
  const {page_no,offset,user_id} = action;

  let data={
    page_no,
    offset,
    user_id,
  };

  console.log('deviceLogs-->',data)
  const response = yield call(api.getDeviceLogs, JSON.stringify(data));

  if (response.ok) {
    yield put(adminActions.deviceLogsResponse(response.data));
  } else {
    yield put(adminActions.deviceLogsFailed());
  }
}


export function* getCustomerReports(api, action) {
  const {customerInput} = action;
  const response = yield call(api.getCustomerReports, JSON.stringify(customerInput));
  console.log('REPORT RESPONSE :: ', response)

  if (response.ok) {
    yield put(adminActions.customerReportsResponse(response.data));
  } else {
    yield put(adminActions.customerReportsFailed());
  }
}

export function* getOddReports(api, action) {
  const {customerInput} = action;
  const response = yield call(api.getOddReports, JSON.stringify(customerInput));

  if (response.ok) {
    yield put(adminActions.oddOrdersReportsResponse(response.data));
  } else {
    yield put(adminActions.oddOrdersReportsFailed());
  }
}

export function* getProductReports(api, action) {
  const {customerInput} = action;
  const response = yield call(api.getProductsReports, JSON.stringify(customerInput));

  if (response.ok) {
    yield put(adminActions.productsReportsResponse(response.data));
  } else {
    yield put(adminActions.productsReportsFailed());
  }
}

export function* getDispatchOrdersReports(api, action) {
  const {customerInput} = action;
  const response = yield call(api.getDispatchOrdersReports, JSON.stringify(customerInput));

  if (response.ok) {
    yield put(adminActions.dispatchReportsResponse(response.data));
  } else {
    yield put(adminActions.dispatchReportsFailed());
  }
}

export function* getStateList(api, action) {
  const response = yield call(api.getStateList)
  
  if (response.ok) {
    yield put(adminActions.getStateListResponse(response.data))
  } else {
    yield put(adminActions.getStateListFailed())
  }
}

export function* getCityList(api, action) {
  const response = yield call(api.getCityList)
  console.log("city list saga", response.data)
  if (response.ok) {
    yield put(adminActions.getCityListResponse(response.data))
  } else {
    yield put(adminActions.getCityListFailed())
  }
}

export function* getStateWiseCity(api,action){
  const {page_no,offset,state} = action;
  let data={
    state : state
  }
  console.log('api call of list city')
  const response =yield call(api.getStateWiseCitiesList,JSON.stringify(data))

  console.log("city list saga", response.data)
  if(response.ok){
    yield put(adminActions.getStateWiseCitiesSuccess(response.data))
  }else{
    yield put(adminActions.getStateWiseCityFailed())
  }
}
//getCustomerReports

//reject with reasons 
export function* rejectOrderWithReason(api,action){
  console.log(api.rejectOrderApi)
  const {page_no,offset,data} = action;
  const response =yield call(api.rejectOrderWithReason,JSON.stringify(data))
  console.log("[rejectOrderWithReason]", response.data)
  if(response.ok){
    yield put(adminActions.rejectOrderSuccess(response.data))
  }else{
    yield put(adminActions.rejectOrderFailure())
  }
}