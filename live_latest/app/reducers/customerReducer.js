/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';
import {Constants} from '../Resources';
import {Strings} from '../utils/Strings';

const initialState = {
  //  isFabricDataFound: false,
    fabricData: null,
    catalogData: null,
    listOfAddedAddress: null,
    productData:[],
    cartArr: [],
    OTPResponse: []
};
export const customerReducer = createReducer(initialState, {
    [types.GET_FABRIC_REQUEST](state, action) {
        return {...state, isFabricDataFound: false};
    },

    [types.FABRIC_SUCCESS](state, action) {
        const {message} = action.response;
        return {...state, fabricData: action.response, isFabricDataFound: true, errorMessage: message};

    },
    [types.FABRIC_FAILURE](state) {
        return {...state, isFabricDataFound: true, fabricData: null, errorMessage: Strings.generic_error.message};
    },

    [types.GET_CATALOG_REQUEST](state, action) {
        return {...state, isCatalogDataFound: false};
    },

    [types.CATALOG_SUCCESS](state, action) {
        const {message} = action.response;
        return {...state, catalogData: action.response, isCatalogDataFound: true, errorMessage: message};

    },
    [types.CATALOG_FAILURE](state) {
        return {...state, isCatalogDataFound: true, catalogData: null, errorMessage: Strings.generic_error.message};
    },

    [types.GET_PRODUCT_REQUEST](state, action) {
        return {...state,productData:null, isProductDataFound: false};
    },

    [types.PRODUCT_SUCCESS](state, action) {
        const {message} = action.response;
        return {...state, productData: action.response, isProductDataFound: true, errorMessage: message};

    },
    [types.PRODUCT_FAILURE](state) {
        return {...state, isProductDataFound: true, productData:{}, errorMessage: Strings.generic_error.message};
    },

    [types.STORE_CART_DATA](state, action) {
        const {cartObj, operationType} = action;
        let previousArr = state.cartArr == null ? [] : state.cartArr;
        if (operationType === Constants.CRUD_OPERATION_TYPES.ADD_DATA) {
            previousArr.push(cartObj);

        } else if (operationType === Constants.CRUD_OPERATION_TYPES.UPDATE) {
           let index= previousArr.findIndex((e)=>{
                return e.productId==cartObj.productId
            })
            if (index>-1){
                previousArr.splice(index,1,cartObj)
            }else {
                previousArr.push(cartObj);
            }

        } else if (operationType === Constants.CRUD_OPERATION_TYPES.DELETE) {
            let index=previousArr.findIndex((e)=>{
                return e.productId === cartObj.productId
            })
            previousArr.splice(index,1);
        }
        console.log('previoourArr=',previousArr.length)
        return {...state, cartArr: previousArr,isCartUpdated:!state.isCartUpdated};
    },

    [types.CLEAR_CART](state, action) {

        return {...state, cartArr: []};
    },

    [types.FETCH_ADDRESS_REQUEST](state, action) {
        return {...state, isShippingAddressFound: false, listOfAddedAddress: null, errorMessage: null};
    },

    [types.FETCH_ADDRESS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            status: status.toString(),
            listOfAddedAddress: action.response,
            errorMessage: message,
            isShippingAddressFound: true,
        };
    },

    [types.FETCH_ADDRESS_FAILED](state) {
        return {
            ...state,
            errorMessage: Strings.generic_error.message,
            isShippingAddressFound: true,
            listOfAddedAddress: null,
        };
    },


    [types.ADD_ADDRESS_REQUEST](state, action) {

        return {...state, isNewAddressAdded: false, errorMessage: ''};
    },

    [types.ADD_ADDRESS_RESPONSE](state, action) {

        const {status, message} = action.response;

        return {...state, status: status.toString(), errorMessage: message, isNewAddressAdded: true};
    },

    [types.ADD_ADDRESS_FAILED](state) {
        return {...state, errorMessage: Strings.generic_error.message, isNewAddressAdded: true, status: 401};
    },

   ///Update address
    [types.UPDATE_ADDRESS_REQUEST](state, action) {

        return {...state, isAddressUpdated: false, errorMessage: ''};
    },

    [types.UPDATE_ADDRESS_RESPONSE](state, action) {

        const {status, message} = action.response;

        return {...state, status: status.toString(), errorMessage: message, isAddressUpdated: true};
    },

    [types.UPDATE_ADDRESS_FAILED](state) {
        return {...state, errorMessage: Strings.generic_error.message, isAddressUpdated: true, status: 401};
    },



    [types.ORDER_PLACED_REQUEST](state, action) {

        return { isOrderPlaced: false, errorMessage: '', orderData: null};
    },

    [types.ORDER_PLACED_RESPONSE](state, action) {
        const {status, message} = action.response;
        return { ...state, status: status.toString(), orderData: action.response, errorMessage: message, isOrderPlaced: true};
    },

    [types.ORDER_PLACED_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isOrderPlaced: true, status: 401, orderData: null};
    },


    [types.GET_USER_DETAILS_REQUEST](state, action) {

        return { isUserFound: false, errorMessage: '', userDetail: null};
    },

    [types.GET_USER_DETAILS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return { ...state, status: status.toString(), userDetail: action.response, errorMessage: message};
    },

    [types.GET_USER_DETAILS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message,  status: 401, userDetail: null};
    },

    [types.UPDATE_USER_DETAILS_REQUEST](state, action) {
        return { isUserUpdated: false, errorMessage: '',};
    },

    [types.UPDATE_USER_DETAILS_RESPONSE](state, action) {
        const {status, message} = action.response;

        return { ...state, status: status?status.toString():401, errorMessage: message, isUserUpdated: true};
    },

    [types.UPDATE_USER_DETAILS_FAILED](state) {

        return {errorMessage: Strings.generic_error.message, isUserUpdated: true, status: 401};
    },

     // My Orders Request
    /*[types.MY_ORDERS_REQUEST](state, action) {
        return {...state, isOrderPlaced: false, errorMessage: '', orderData: null};
    },

    [types.MY_ORDERS_RESPONSE](state, action) {
        const {status, message} = action.response;
        return {
            ...state,
            status: status.toString(),
            orderData: action.response,
            errorMessage: message,
            isOrderPlaced: true,
        };
    },

    [types.MY_ORDERS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isOrderPlaced: true, status: 401, orderData: null};
    },
*/
    //Order Details

    [types.MY_ORDERS_REQUEST](state, action) {
        return {...state, isorder: false, errorMessage: '', orderData: null};
    },

    [types.MY_ORDERS_RESPONSE](state, action) {
        const {status, message} = action.response;

        return {
            ...state,
            status: status.toString(),
            orderData: action.response,
            errorMessage: message,
            isOrderPlaced: true,
        };
    },

    [types.MY_ORDERS_FAILED](state) {
        return {errorMessage: Strings.generic_error.message, isOrderPlaced: true, status: 401, orderData: null};
    },


     // Logout
    [types.LOG_OUT](state) {

        return {...state, isLoggedIn: false, cartArr: null};
    },
    [types.SEND_OTP](state) {
        return {...state, errorMessage: ''}
    },
    [types.SEND_OTP_SUCCESS](state, action) {
        const { status, message } = action.response
        return {
            ...state,
            errorMessage: message,
            status: status.toString(),
            OTPResponse: action.response
        }
    },
    [types.SEND_OTP_FAILED](state) {
        return {
            errorMessage: Strings.generic_error.message,
            status: 401,
            OTPResponse: null
        }
    }


});


